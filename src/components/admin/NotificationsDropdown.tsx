import { Bell, CheckCircle2, Database, AlertTriangle, Settings, X, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications, Notification } from "@/contexts/NotificationsContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "À l'instant";
  if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)}h`;
  return `Il y a ${Math.floor(diffInSeconds / 86400)}j`;
}

function NotificationIcon({ type }: { type: Notification["type"] }) {
  const iconClass = "h-4 w-4";
  
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

function NotificationItem({ 
  notification, 
  onRead, 
  onClear, 
  onClick 
}: { 
  notification: Notification;
  onRead: () => void;
  onClear: () => void;
  onClick: () => void;
}) {
  return (
    <div 
      className={cn(
        "flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/50 last:border-0",
        !notification.read && "bg-primary/5"
      )}
      onClick={() => {
        onRead();
        onClick();
      }}
    >
      <div className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full shrink-0",
        notification.type === "validation" && "bg-secondary/10",
        notification.type === "data" && "bg-primary/10",
        notification.type === "alert" && "bg-amber-500/10",
        notification.type === "system" && "bg-muted"
      )}>
        <NotificationIcon type={notification.type} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn(
            "text-sm line-clamp-1",
            !notification.read && "font-medium"
          )}>
            {notification.title}
          </p>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 shrink-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatTimeAgo(notification.createdAt)}
        </p>
      </div>
      
      {!notification.read && (
        <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
      )}
    </div>
  );
}

export function NotificationsDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  const navigate = useNavigate();

  const handleNotificationClick = (notification: Notification) => {
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h4 className="font-semibold text-sm">Notifications</h4>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs gap-1"
              onClick={markAllAsRead}
            >
              <CheckCheck className="h-3 w-3" />
              Tout marquer lu
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[380px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Bell className="h-10 w-10 mb-3 opacity-20" />
              <p className="text-sm">Aucune notification</p>
            </div>
          ) : (
            <div className="group">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={() => markAsRead(notification.id)}
                  onClear={() => clearNotification(notification.id)}
                  onClick={() => handleNotificationClick(notification)}
                />
              ))}
            </div>
          )}
        </ScrollArea>
        
        <div className="border-t border-border p-2">
          <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => navigate("/admin")}>
            Voir toutes les activités
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
