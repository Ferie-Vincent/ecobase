import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface Notification {
  id: string;
  type: "validation" | "data" | "system" | "alert";
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Initial mock notifications
const initialNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "validation",
    title: "Validation en attente",
    message: "La donnée 'Transferts Diaspora' nécessite votre validation.",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
    actionUrl: "/admin/donnees"
  },
  {
    id: "notif-2",
    type: "data",
    title: "Nouvelle donnée importée",
    message: "12 nouvelles entrées ont été importées via l'API CEDEAO.",
    read: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
    actionUrl: "/admin/donnees"
  },
  {
    id: "notif-3",
    type: "system",
    title: "Synchronisation terminée",
    message: "La synchronisation avec BCEAO s'est terminée avec succès.",
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
  },
  {
    id: "notif-4",
    type: "validation",
    title: "Donnée validée",
    message: "L'indicateur 'SLEC Exports' a été validé par SPSE.",
    read: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "notif-5",
    type: "alert",
    title: "Alerte performance",
    message: "L'objectif 'Agréments SLEC' est à risque pour ce trimestre.",
    read: true,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    actionUrl: "/admin/indicateurs"
  }
];

// Simulated real-time notifications
const simulatedNotifications = [
  {
    type: "validation" as const,
    title: "Nouvelle validation requise",
    message: "La donnée 'Voyageurs aériens CEDEAO' attend votre validation."
  },
  {
    type: "data" as const,
    title: "Mise à jour des données",
    message: "Les données UEMOA ont été mises à jour automatiquement."
  },
  {
    type: "system" as const,
    title: "Connecteur actif",
    message: "Le connecteur CEDEAO API est maintenant opérationnel."
  },
  {
    type: "alert" as const,
    title: "Échéance proche",
    message: "Le rapport trimestriel doit être soumis dans 3 jours."
  }
];

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((notification: Omit<Notification, "id" | "createdAt" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Simulate real-time notifications every 30-60 seconds
  useEffect(() => {
    const simulateNotification = () => {
      const randomNotif = simulatedNotifications[Math.floor(Math.random() * simulatedNotifications.length)];
      addNotification(randomNotif);
    };

    // First notification after 45 seconds
    const timeout = setTimeout(simulateNotification, 45000);
    
    // Then every 30-60 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.5) { // 50% chance
        simulateNotification();
      }
    }, 30000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [addNotification]);

  return (
    <NotificationsContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      clearNotification,
      addNotification
    }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
}
