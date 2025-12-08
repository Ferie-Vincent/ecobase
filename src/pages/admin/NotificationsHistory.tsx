import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNotifications, Notification } from "@/contexts/NotificationsContext";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  CheckCircle2, 
  Database, 
  AlertTriangle, 
  Settings, 
  Search,
  Filter,
  CheckCheck,
  Trash2,
  Calendar,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "À l'instant";
  if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)}h`;
  return `Il y a ${Math.floor(diffInSeconds / 86400)}j`;
}

function NotificationIcon({ type }: { type: Notification["type"] }) {
  const iconClass = "h-5 w-5";
  
  switch (type) {
    case "validation":
      return <CheckCircle2 className={cn(iconClass, "text-secondary")} />;
    case "data":
      return <Database className={cn(iconClass, "text-primary")} />;
    case "alert":
      return <AlertTriangle className={cn(iconClass, "text-amber-500")} />;
    case "system":
      return <Settings className={cn(iconClass, "text-muted-foreground")} />;
    default:
      return <Bell className={iconClass} />;
  }
}

function getTypeBadge(type: Notification["type"]) {
  const config: Record<Notification["type"], { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
    validation: { label: "Validation", variant: "default" },
    data: { label: "Données", variant: "secondary" },
    alert: { label: "Alerte", variant: "destructive" },
    system: { label: "Système", variant: "outline" }
  };
  
  return <Badge variant={config[type].variant}>{config[type].label}</Badge>;
}

export default function NotificationsHistory() {
  const { notifications, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    // Search filter
    if (searchTerm && !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !notification.message.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Type filter
    if (typeFilter !== "all" && notification.type !== typeFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter === "read" && !notification.read) return false;
    if (statusFilter === "unread" && notification.read) return false;
    
    // Date filter
    const now = new Date();
    const notifDate = new Date(notification.createdAt);
    
    if (dateFilter === "today") {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      if (notifDate < today) return false;
    } else if (dateFilter === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      if (notifDate < weekAgo) return false;
    } else if (dateFilter === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      if (notifDate < monthAgo) return false;
    }
    
    return true;
  });

  // Stats
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    validation: notifications.filter(n => n.type === "validation").length,
    alert: notifications.filter(n => n.type === "alert").length
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Historique des notifications</h1>
          <p className="text-muted-foreground">Consultez et gérez toutes vos notifications</p>
        </div>
        <Button onClick={markAllAsRead} disabled={stats.unread === 0}>
          <CheckCheck className="h-4 w-4 mr-2" />
          Tout marquer comme lu
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non lues</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.unread}</div>
            <p className="text-xs text-muted-foreground">en attente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Validations</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats.validation}</div>
            <p className="text-xs text-muted-foreground">notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{stats.alert}</div>
            <p className="text-xs text-muted-foreground">notifications</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <CardTitle className="text-base">Filtres</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="validation">Validation</SelectItem>
                <SelectItem value="data">Données</SelectItem>
                <SelectItem value="alert">Alerte</SelectItem>
                <SelectItem value="system">Système</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les dates</SelectItem>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="week">7 derniers jours</SelectItem>
                <SelectItem value="month">30 derniers jours</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="unread">Non lues</SelectItem>
                <SelectItem value="read">Lues</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              Notifications ({filteredNotifications.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Bell className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">Aucune notification</p>
              <p className="text-sm">Modifiez vos filtres pour voir plus de résultats</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                    !notification.read && "bg-primary/5"
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full shrink-0",
                    notification.type === "validation" && "bg-secondary/10",
                    notification.type === "data" && "bg-primary/10",
                    notification.type === "alert" && "bg-amber-500/10",
                    notification.type === "system" && "bg-muted"
                  )}>
                    <NotificationIcon type={notification.type} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={cn(
                          "text-sm",
                          !notification.read && "font-medium"
                        )}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {getTypeBadge(notification.type)}
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(notification.createdAt, "dd MMM yyyy", { locale: fr })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(notification.createdAt, "HH:mm", { locale: fr })}
                      </div>
                      <span>•</span>
                      <span>{formatTimeAgo(notification.createdAt)}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearNotification(notification.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
