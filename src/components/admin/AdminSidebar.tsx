import {
  LayoutDashboard,
  Globe,
  Building2,
  Settings,
  Users,
  FileText,
  BarChart3,
  Database,
  GitBranch,
  FileSpreadsheet,
  Plug,
  UserCog,
  Map
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Tableau de bord",
    items: [
      { title: "Vue d'ensemble", url: "/admin", icon: LayoutDashboard }
    ]
  },
  {
    title: "Gestion des Acteurs & Entités",
    items: [
      { title: "Organisations régionales", url: "/admin/organisations", icon: Globe },
      { title: "Structures nationales", url: "/admin/structures-nationales", icon: Building2 },
      { title: "Structures internes", url: "/admin/structures-internes", icon: Settings },
      { title: "Partenaires (PTF)", url: "/admin/partenaires", icon: Users },
      { title: "Pays membres", url: "/admin/pays", icon: Map }
    ]
  },
  {
    title: "Programmes & Données",
    items: [
      { title: "Programmes & Projets", url: "/admin/programmes", icon: FileText },
      { title: "Indicateurs", url: "/admin/indicateurs", icon: BarChart3 },
      { title: "Données", url: "/admin/donnees", icon: Database },
      { title: "Workflow", url: "/admin/workflow", icon: GitBranch }
    ]
  },
  {
    title: "Rapports & Paramètres",
    items: [
      { title: "Rapports & Exports", url: "/admin/rapports", icon: FileSpreadsheet },
      { title: "Connecteurs", url: "/admin/connecteurs", icon: Plug },
      { title: "Utilisateurs & Rôles", url: "/admin/utilisateurs", icon: UserCog },
      { title: "Paramètres", url: "/admin/parametres", icon: Settings }
    ]
  }
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        {menuItems.map((section) => (
          <SidebarGroup key={section.title}>
            {!isCollapsed && <SidebarGroupLabel>{section.title}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink
                        to={item.url}
                        end={item.url === "/admin"}
                        className={({ isActive }) =>
                          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                        }
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
