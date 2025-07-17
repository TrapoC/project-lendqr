import React, { useState } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { cn } from '../lib/utils';
import { 
  Home, 
  Users, 
  Shield, 
  CreditCard, 
  PiggyBank, 
  FileText, 
  CheckCircle, 
  UserCheck,
  Building,
  Package,
  Banknote,
  DollarSign,
  ArrowRightLeft,
  Settings,
  Wrench,
  Receipt,
  Activity,
  MessageSquare,
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  active?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeSection, onSectionChange }) => {
  const [expandedSections, setExpandedSections] = useState<number[]>([1]); // CUSTOMERS section expanded by default

  const toggleSection = (sectionIndex: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionIndex) 
        ? prev.filter(i => i !== sectionIndex)
        : [...prev, sectionIndex]
    );
  };

  const navigationData: NavSection[] = [
    {
      items: [
        {
          id: 'switch-org',
          label: 'Switch Organization',
          icon: Building,
        },
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: Home,
        },
      ],
    },
    {
      title: 'CUSTOMERS',
      items: [
        {
          id: 'users',
          label: 'Users',
          icon: Users,
          active: activeSection === 'users',
        },
        {
          id: 'guarantors',
          label: 'Guarantors',
          icon: Shield,
        },
        {
          id: 'loans',
          label: 'Loans',
          icon: CreditCard,
        },
        {
          id: 'decision-models',
          label: 'Decision Models',
          icon: Activity,
        },
        {
          id: 'savings',
          label: 'Savings',
          icon: PiggyBank,
        },
        {
          id: 'loan-requests',
          label: 'Loan Requests',
          icon: FileText,
        },
        {
          id: 'whitelist',
          label: 'Whitelist',
          icon: CheckCircle,
        },
        {
          id: 'karma',
          label: 'Karma',
          icon: UserCheck,
        },
      ],
    },
    {
      title: 'BUSINESSES',
      items: [
        {
          id: 'organization',
          label: 'Organization',
          icon: Building,
        },
        {
          id: 'loan-products',
          label: 'Loan Products',
          icon: Package,
        },
        {
          id: 'savings-products',
          label: 'Savings Products',
          icon: Banknote,
        },
        {
          id: 'fees-charges',
          label: 'Fees and Charges',
          icon: DollarSign,
        },
        {
          id: 'transactions',
          label: 'Transactions',
          icon: ArrowRightLeft,
        },
        {
          id: 'services',
          label: 'Services',
          icon: Settings,
        },
        {
          id: 'service-account',
          label: 'Service Account',
          icon: UserCheck,
        },
        {
          id: 'settlements',
          label: 'Settlements',
          icon: Receipt,
        },
        {
          id: 'reports',
          label: 'Reports',
          icon: FileText,
        },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        {
          id: 'preferences',
          label: 'Preferences',
          icon: Settings,
        },
        {
          id: 'fees-pricing',
          label: 'Fees and Pricing',
          icon: DollarSign,
        },
        {
          id: 'audit-logs',
          label: 'Audit Logs',
          icon: Activity,
        },
        {
          id: 'system-messages',
          label: 'Systems Messages',
          icon: MessageSquare,
        },
      ],
    },
    {
      items: [
        {
          id: 'logout',
          label: 'Logout',
          icon: LogOut,
        },
      ],
    },
  ];

  const handleItemClick = (itemId: string) => {
    if (itemId === 'logout') {
      // Handle logout
      return;
    }
    
    onSectionChange(itemId);
    
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "fixed md:static top-[100px] left-0 w-[283px] h-[calc(100vh-100px)] md:h-full bg-white shadow-[0px_5px_20px_#0000000a] z-40 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <ScrollArea className="h-full">
          <div className="py-4 px-6">
            <nav className="space-y-6">
              {navigationData.map((section, sectionIndex) => (
                <div key={`section-${sectionIndex}`} className="space-y-2">
                  {section.title && (
                    <button
                      onClick={() => toggleSection(sectionIndex)}
                      className="w-full text-left text-xs font-medium text-[#545f7d] px-2 py-1 hover:text-[#213f7d] transition-colors flex items-center justify-between"
                    >
                      {section.title}
                      {expandedSections.includes(sectionIndex) ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </button>
                  )}
                  <ul className={cn(
                    "space-y-1 transition-all duration-300 overflow-hidden",
                    section.title && !expandedSections.includes(sectionIndex) ? "max-h-0" : "max-h-none"
                  )}>
                    {section.items.map((item, itemIndex) => (
                      <li key={`item-${sectionIndex}-${itemIndex}`}>
                        <Button
                          variant="ghost"
                          onClick={() => handleItemClick(item.id)}
                          className={cn(
                            "w-full justify-start px-2 py-2.5 h-10 relative transition-all duration-200 hover:bg-[#39cdcc]/10 hover:translate-x-1",
                            item.active
                              ? "bg-[#39cdcc] bg-opacity-[0.06] text-[#213f7d]"
                              : "text-[#213f7d]"
                          )}
                        >
                          {item.active && (
                            <div className="absolute w-[3px] h-10 top-0 left-0 bg-[#39cdcc]" />
                          )}
                          <div className="flex items-center">
                            <item.icon className="w-4 h-4 mr-2" />
                            <span className="font-normal text-base whitespace-nowrap">
                              {item.label}
                            </span>
                            {item.id === 'switch-org' && (
                              <ChevronDown className="ml-auto w-3 h-3" />
                            )}
                          </div>
                        </Button>
                      </li>
                    ))}
                  </ul>
                  {sectionIndex === navigationData.length - 2 && <Separator />}
                </div>
              ))}
            </nav>
            <div className="pt-4 px-2">
              <p className="text-xs font-normal text-[#213f7d] opacity-60">v1.2.0</p>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};