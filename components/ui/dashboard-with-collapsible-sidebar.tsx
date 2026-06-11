"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  FileText,
  MessageSquare,
  ChevronsRight,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Eye,
  Menu,
  X,
  User,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Section = "Dashboard" | "User Management" | "Blogs" | "Client Requests" | "Settings";

export const AdminDashboard = () => {
  const [selected, setSelected] = useState<Section>("Dashboard");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const fetchUnread = async () => {
    try {
      const { data } = await supabase
        .from('client_requests')
        .select('id')
        .eq('viewed', false);
      
      setUnreadCount(data?.length || 0);
    } catch (err) {
      console.error('Error fetching unread:', err);
    }
  };

  useEffect(() => {
    fetchUnread();
    // Poll for new requests every 10 seconds
    const interval = setInterval(fetchUnread, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check Supabase auth session
    const checkAuth = async () => {
      console.log('Checking auth session...');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('No session, redirecting to login');
        router.push('/admin');
      } else {
        console.log('Session found, user:', session.user?.email);
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    console.log('Signing out...');
    await supabase.auth.signOut();
    router.push('/admin');
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {/* Mobile backdrop */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}
        
        {/* Sidebar */}
        <Sidebar 
          onLogout={handleLogout} 
          selected={selected} 
          setSelected={setSelected} 
          unreadCount={unreadCount} 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        
        {/* Main content */}
        <div className="flex-1">
          {/* Mobile header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-30">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Chamos Tech
              </span>
            </div>
            <div></div>
          </div>
          
          <MainContent 
            selected={selected} 
            setSelected={setSelected} 
            unreadCount={unreadCount} 
            fetchUnread={fetchUnread}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ onLogout, selected, setSelected, unreadCount, mobileMenuOpen, setMobileMenuOpen }: { onLogout: () => void; selected: Section; setSelected: (s: Section) => void; unreadCount: number; mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void }) => {
  const [open, setOpen] = useState(true);

  // Handle option selection on mobile
  const handleSelect = (section: Section) => {
    setSelected(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`
        md:sticky top-0 md:h-screen md:shrink-0 border-r transition-all duration-300 ease-in-out
        ${open ? 'w-64' : 'w-16'}
        fixed md:relative z-50 md:z-auto
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-64 md:w-auto
        h-screen
        border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm flex flex-col
      `}
    >
      {/* Header with Toggle */}
      <div className="flex items-center justify-between mb-4">
        <TitleSection open={open} />
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ChevronsRight
            className={`h-5 w-5 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="space-y-1 mb-8 flex-1">
        <Option
          Icon={Home}
          title="Dashboard"
          selected={selected}
          setSelected={handleSelect}
          open={open}
        />
        <Option
          Icon={Users}
          title="User Management"
          selected={selected}
          setSelected={handleSelect}
          open={open}
        />
        <Option
          Icon={FileText}
          title="Blogs"
          selected={selected}
          setSelected={handleSelect}
          open={open}
        />
        <Option
          Icon={MessageSquare}
          title="Client Requests"
          selected={selected}
          setSelected={handleSelect}
          open={open}
          notifs={unreadCount > 0 ? unreadCount : undefined}
        />
        <Option
          Icon={Settings}
          title="Settings"
          selected={selected}
          setSelected={handleSelect}
          open={open}
        />
      </div>

      {open && (
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-1">
          <button
            onClick={onLogout}
            className="relative flex h-11 w-full items-center rounded-md transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
          >
            <div className="grid h-full w-12 place-content-center">
              <LogOut className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs }: any) => {
  const isSelected = selected === title;
  
  return (
    <button
      onClick={() => setSelected(title)}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        isSelected 
          ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm border-l-2 border-blue-500" 
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      
      {open && (
        <span
          className={`text-sm font-medium transition-opacity duration-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {title}
        </span>
      )}

      {notifs && open && (
        <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600 text-xs text-white font-medium">
          {notifs}
        </span>
      )}
    </button>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className="flex items-center gap-3 p-2">
      <Logo />
      {open && (
        <div className={`transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Chamos Tech
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Admin Panel
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const Logo = () => {
  return (
    <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
      <img
        src="/chamos-tech-logo.jpeg"
        alt="Chamos Tech Logo"
        className="w-8 h-8 object-cover rounded-md"
      />
    </div>
  );
};

const MainContent = ({ selected, setSelected, unreadCount, fetchUnread, setMobileMenuOpen }: { selected: Section; setSelected: (s: Section) => void; unreadCount: number; fetchUnread: () => void; setMobileMenuOpen: (open: boolean) => void }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [recentUnread, setRecentUnread] = useState<any[]>([]);

  const loadRecentUnread = async () => {
    try {
      const { data } = await supabase
        .from('client_requests')
        .select('id, name, email, created_at')
        .eq('viewed', false)
        .order('created_at', { ascending: false });
      
      setRecentUnread(data?.slice(0, 3) || []);
    } catch (err) {
      console.error('Error fetching recent unread:', err);
    } finally {
      setNotificationsLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  useEffect(() => {
    loadRecentUnread();
  }, []);

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-4 md:p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">{selected}</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
            {selected === "Dashboard" && "Overview of your Chamos Tech admin panel"}
            {selected === "User Management" && "Manage all admin users in the system"}
            {selected === "Blogs" && "Manage all blogs and articles"}
            {selected === "Client Requests" && "View and respond to client messages from the contact page"}
            {selected === "Settings" && "Update your profile and password"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div 
                  onClick={() => setShowNotifications(false)} 
                  className="fixed inset-0 z-10"
                ></div>
                <div className="absolute right-0 top-12 z-20 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full font-medium">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="max-h-80 overflow-auto">
                    {notificationsLoading ? (
                      <div className="p-4 space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex gap-3 animate-pulse">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                            <div className="flex-1">
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
                              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : unreadCount === 0 ? (
                      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No new notifications</p>
                      </div>
                    ) : (
                      recentUnread.map((req) => (
                        <div 
                          key={req.id}
                          onClick={() => {
                            setSelected('Client Requests');
                            setShowNotifications(false);
                          }}
                          className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                        >
                          <div className="flex gap-3">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                              <MessageSquare className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                New request from {req.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {req.email} • {formatTimeAgo(req.created_at)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                      <button
                        onClick={() => {
                          setSelected('Client Requests');
                          setShowNotifications(false);
                        }}
                        className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                      >
                        View all requests
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>


        </div>
      </div>
      
      {/* Render Content Based on Selected Section */}
      {selected === "Dashboard" && (
        <DashboardOverview onSectionChange={setSelected} />
      )}
      {selected === "User Management" && (
        <UserManagementSection />
      )}
      {selected === "Blogs" && (
        <BlogsSection />
      )}
      {selected === "Client Requests" && (
        <ClientRequestsSection />
      )}
      {selected === "Settings" && (
        <SettingsSection />
      )}
    </div>
  );
};

const DashboardOverview = ({ onSectionChange }: { onSectionChange: (s: Section) => void }) => {
  const [stats, setStats] = useState({
    totalAdmins: 0,
    totalBlogs: 0,
    unreadRequests: 0,
    totalRequests: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);

  const fetchStats = async () => {
    try {
      // Fetch all counts in parallel
      const [adminsRes, blogsRes, requestsRes] = await Promise.all([
        supabase.from('admins').select('id', { count: 'exact', head: true }),
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
        supabase.from('client_requests').select('id, viewed, name, created_at, email').order('created_at', { ascending: false })
      ]);

      const totalRequests = requestsRes.data?.length || 0;
      const unreadRequests = requestsRes.data?.filter(r => !r.viewed).length || 0;
      const recent = requestsRes.data?.slice(0, 3) || [];

      // Fetch recent blogs
      const { data: blogsData } = await supabase
        .from('blogs')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      setRecentBlogs(blogsData || []);
      setRecentRequests(recent);
      setStats({
        totalAdmins: adminsRes.count || 0,
        totalBlogs: blogsRes.count || 0,
        unreadRequests,
        totalRequests
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div>
      {/* Stats Grid - Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <button
          onClick={() => onSectionChange("User Management")}
          className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <TrendingUp className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Total Admins</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {loading ? '...' : stats.totalAdmins}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1 group-hover:underline">Click to manage →</p>
        </button>
        
        <button
          onClick={() => onSectionChange("Blogs")}
          className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <TrendingUp className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Total Blogs</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {loading ? '...' : stats.totalBlogs}
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1 group-hover:underline">Click to manage →</p>
        </button>
        
        <button
          onClick={() => onSectionChange("Client Requests")}
          className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <MessageSquare className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            {stats.unreadRequests > 0 && (
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-bold">
                  {stats.unreadRequests} new
                </span>
              </div>
            )}
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Unread Requests</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {loading ? '...' : stats.unreadRequests}
          </p>
          <p className="text-sm text-orange-600 dark:text-orange-400 mt-1 group-hover:underline">Click to view →</p>
        </button>

        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Total Requests</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {loading ? '...' : stats.totalRequests}
          </p>
        </div>
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 rounded-lg animate-pulse">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : (
                [...recentRequests.map(r => ({ 
                  type: 'request', 
                  data: r 
                })), ...recentBlogs.map(b => ({ 
                  type: 'blog', 
                  data: b 
                }))]
                .sort((a, b) => new Date(b.data.created_at).getTime() - new Date(a.data.created_at).getTime())
                .slice(0, 5)
                .map((activity, i) => {
                  const isRequest = activity.type === 'request';
                  const Icon = isRequest ? MessageSquare : FileText;
                  const color = isRequest ? 'orange' : 'purple';
                  return (
                    <div 
                      key={i} 
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => isRequest ? onSectionChange('Client Requests') : onSectionChange('Blogs')}
                    >
                      <div className={`p-2 rounded-lg ${
                        color === 'green' ? 'bg-green-50 dark:bg-green-900/20' :
                        color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20' :
                        color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20' :
                        'bg-orange-50 dark:bg-orange-900/20'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          color === 'green' ? 'text-green-600 dark:text-green-400' :
                          color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                          color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                          'text-orange-600 dark:text-orange-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {isRequest ? 'New client request' : 'New blog published'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {isRequest ? activity.data.name : activity.data.title}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {formatTimeAgo(activity.data.created_at)}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => onSectionChange("Blogs")}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Blog</span>
              </button>
              <button
                onClick={() => onSectionChange("User Management")}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Admin</span>
              </button>
              <button
                onClick={() => onSectionChange("Client Requests")}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>View Pending Requests</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AdminUser {
  id: string;
  email: string;
  username?: string;
  role: string;
  status: "Active" | "Inactive";
  created_at: string;
}

const UserManagementSection = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Admin');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch admins
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Format data
      const formatted = (data || []).map((item: any) => ({
        ...item,
        status: item.status || 'Active'
      }));
      
      setAdmins(formatted);
    } catch (err: any) {
      console.error('Error fetching admins:', err);
      setError('Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Add admin
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail) return;
    
    setSubmitting(true);
    setError('');
    
    try {
      const res = await fetch('/api/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newAdminEmail, role: newAdminRole })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Reset and refresh
      setNewAdminEmail('');
      setNewAdminRole('Admin');
      setShowAddModal(false);
      await fetchAdmins();
      
    } catch (err: any) {
      console.error('Error adding admin:', err);
      setError(err.message || 'Failed to add admin');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete admin
  const handleDeleteAdmin = async (adminId: string) => {
    if (!confirm('Are you sure you want to delete this admin?')) return;
    
    try {
      // Delete from admins table first
      const { error: dbError } = await supabase
        .from('admins')
        .delete()
        .eq('id', adminId);

      if (dbError) throw dbError;

      await fetchAdmins();
    } catch (err: any) {
      console.error('Error deleting admin:', err);
      setError('Failed to delete admin');
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Admin Users</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Admin</span>
        </Button>
      </div>

      {error && (
        <div className="px-6 pt-4">
          <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm">
            {error}
          </div>
        </div>
      )}

      {loading ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {admins.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No admins found
            </div>
          ) : (
            admins.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="grid h-10 w-10 place-content-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{user.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.role} • {new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {user.status}
                  </span>
                  <button 
                    onClick={() => handleDeleteAdmin(user.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Add New Admin</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              A new admin will be created with a default password: <strong>admin@2026</strong>
            </p>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? 'Adding...' : 'Add Admin'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface Blog {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  author?: string;
  status: "Draft" | "Published";
  created_at: string;
  updated_at: string;
}

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingBlog, setViewingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    image_url: string;
    status: "Draft" | "Published";
    author: string;
  }>({
    title: "",
    content: "",
    image_url: "",
    status: "Draft",
    author: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Fetching blogs from Supabase...');
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('Supabase response:', { data, error });
      
      if (error) throw error;
      setBlogs(data || []);
    } catch (err: any) {
      console.error('Error fetching blogs:', err);
      setError(`Failed to load blogs: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    setSubmitting(true);
    setError('');

    try {
      // Get current user's email
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('blogs')
        .insert({
          ...formData,
          author: formData.author || user?.email || 'Admin'
        });

      if (error) throw error;

      // Reset and refresh
      setFormData({
        title: "",
        content: "",
        image_url: "",
        status: "Draft",
        author: ""
      });
      setShowAddModal(false);
      await fetchBlogs();
    } catch (err: any) {
      console.error('Error creating blog:', err);
      setError(err.message || 'Failed to create blog');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || !formData.title || !formData.content) return;

    setSubmitting(true);
    setError('');

    try {
      const { error } = await supabase
        .from('blogs')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingBlog.id);

      if (error) throw error;

      setShowEditModal(false);
      setEditingBlog(null);
      await fetchBlogs();
    } catch (err: any) {
      console.error('Error updating blog:', err);
      setError(err.message || 'Failed to update blog');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBlog = async (blogId: number) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogId);

      if (error) throw error;
      await fetchBlogs();
    } catch (err: any) {
      console.error('Error deleting blog:', err);
      setError('Failed to delete blog');
    }
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      image_url: blog.image_url || "",
      status: blog.status,
      author: blog.author || ""
    });
    setShowEditModal(true);
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Blog Articles</h3>
        <Link href="/admin/dashboard/blogs/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Article</span>
          </Button>
        </Link>
      </div>

      {error && (
        <div className="px-6 pt-4">
          <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm">
            {error}
          </div>
        </div>
      )}

      {loading ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {blogs.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No blogs found. Start by adding your first article!
            </div>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start gap-4">
                  {blog.image_url && (
                    <img
                      src={blog.image_url}
                      alt=""
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{blog.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      By {blog.author || 'Admin'} • {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    blog.status === "Published" 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}>
                    {blog.status}
                  </span>
                  <button 
                    onClick={() => {
                      setViewingBlog(blog);
                      setShowViewModal(true);
                    }}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <Link href={`/admin/dashboard/blogs/${blog.id}/edit`}>
                    <button className="p-2 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </Link>
                  <button 
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Blog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Add New Blog Article</h3>
            <form onSubmit={handleCreateBlog} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Admin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "Draft" | "Published" })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? 'Adding...' : 'Add Blog'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Blog Modal */}
      {showEditModal && editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Edit Blog Article</h3>
            <form onSubmit={handleEditBlog} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "Draft" | "Published" })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingBlog(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? 'Updating...' : 'Update Blog'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Blog Modal */}
      {showViewModal && viewingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {viewingBlog.image_url && (
              <img
                src={viewingBlog.image_url}
                alt={viewingBlog.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{viewingBlog.title}</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                By {viewingBlog.author || 'Admin'} • {new Date(viewingBlog.created_at).toLocaleDateString()}
              </p>
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {viewingBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface ClientRequest {
  id: number;
  name: string;
  email: string;
  organization?: string;
  message: string;
  created_at: string;
  viewed?: boolean;
}

const ClientRequestsSection = () => {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ClientRequest | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('client_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err: any) {
      console.error('Error fetching requests:', err);
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this request?')) return;

    try {
      const { error } = await supabase
        .from('client_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchRequests();
    } catch (err: any) {
      console.error('Error deleting request:', err);
      setError('Failed to delete request');
    }
  };

  const handleViewDetails = (request: ClientRequest) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleMarkAsViewed = async (id: number) => {
    try {
      // Optimistic UI update first
      setRequests(requests.map(r => 
        r.id === id ? { ...r, viewed: true } : r
      ));
      // Update selected request if we're viewing it
      if (selectedRequest?.id === id) {
        setSelectedRequest({ ...selectedRequest, viewed: true });
      }

      const { error } = await supabase
        .from('client_requests')
        .update({ viewed: true })
        .eq('id', id);

      if (error) throw error;
    } catch (err: any) {
      console.error('Error marking as viewed:', err);
      setError('Failed to mark as viewed');
      // Revert optimistic update on error
      await fetchRequests();
    }
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Client Messages</h3>
        </div>

        {error && (
          <div className="mx-6 my-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">No requests yet</div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {requests.map((request) => (
              <div 
                key={request.id} 
                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${!request.viewed ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    {!request.viewed && (
                      <div className="mt-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{request.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{request.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{formatDate(request.created_at)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{request.message}</p>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleViewDetails(request)} 
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  {!request.viewed && (
                    <Button 
                      onClick={() => handleMarkAsViewed(request.id)} 
                      className="flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mark as Viewed
                    </Button>
                  )}
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDelete(request.id)} 
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Request Details</h3>
              <button 
                onClick={() => setShowDetailsModal(false)} 
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedRequest.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                <a 
                  href={`mailto:${selectedRequest.email}`} 
                  className="text-primary-blue hover:underline"
                >
                  {selectedRequest.email}
                </a>
              </div>
              {selectedRequest.organization && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Organization</label>
                  <p className="text-gray-900 dark:text-gray-100">{selectedRequest.organization}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Received</label>
                <p className="text-gray-900 dark:text-gray-100">{formatDate(selectedRequest.created_at)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Message</label>
                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{selectedRequest.message}</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
                Close
              </Button>
              {!selectedRequest.viewed && (
                <Button onClick={() => handleMarkAsViewed(selectedRequest.id)}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Viewed
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SettingsSection = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submittingProfile, setSubmittingProfile] = useState(false);
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // Try to get username from user metadata or admins table
        const { data: adminData } = await supabase
          .from('admins')
          .select('username')
          .eq('id', user.id)
          .single();
        
        setUsername(adminData?.username || user.email?.split('@')[0] || '');
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmittingProfile(true);

    try {
      // Update auth metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { username }
      });

      if (authError) throw authError;

      // Update admins table
      const { error: dbError } = await supabase
        .from('admins')
        .update({ username })
        .eq('id', user.id);

      if (dbError) throw dbError;

      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmittingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setSubmittingPassword(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      setSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmittingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Profile Settings */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Profile Settings</h3>
        </div>
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm">
              {success}
            </div>
          )}
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <Button type="submit" disabled={submittingProfile}>
              {submittingProfile ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </div>
      </div>

      {/* Password Settings */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Password Settings</h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
                required
              />
            </div>
            <Button type="submit" disabled={submittingPassword}>
              {submittingPassword ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
