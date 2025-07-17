import React, { useState } from 'react';
import { UserTable } from './UserTable';
import { UserDetailsModal } from './UserDetailsModal';
import { User } from '../types/user';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, UserCheck, CreditCard, PiggyBank } from 'lucide-react';
import { useUsers } from '../context/UserContext';

export const Dashboard: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { users } = useUsers();

  const stats = [
    {
      title: 'USERS',
      value: users.length.toLocaleString(),
      icon: Users,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      title: 'ACTIVE USERS',
      value: users.filter(u => u.status === 'Active').length.toLocaleString(),
      icon: UserCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'USERS WITH LOANS',
      value: Math.floor(users.length * 0.3).toLocaleString(),
      icon: CreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'USERS WITH SAVINGS',
      value: Math.floor(users.length * 0.7).toLocaleString(),
      icon: PiggyBank,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <p className="text-gray-600">Manage and view all user accounts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Table */}
      <UserTable onUserSelect={setSelectedUser} />

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};