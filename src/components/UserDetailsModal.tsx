import React, { useState } from 'react';
import { User } from '../types/user';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useUsers } from '../context/UserContext';
import { User as UserIcon, Edit, Save, X, Star } from 'lucide-react';

interface UserDetailsModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const { updateUser } = useUsers();

  const handleSave = () => {
    updateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Blacklisted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (tier: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < tier ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">User Details</DialogTitle>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* User Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-20 h-20 bg-[#213f7d] bg-opacity-20">
                <AvatarFallback className="bg-transparent">
                  <UserIcon className="w-8 h-8 text-[#213f7d]" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-semibold text-[#213f7d]">
                  {editedUser.firstName} {editedUser.lastName}
                </h2>
                <p className="text-gray-600">{editedUser.id}</p>
                <div className="flex items-center justify-center md:justify-start mt-2">
                  <span className="text-sm text-gray-600 mr-2">User Tier:</span>
                  <div className="flex space-x-1">
                    {renderStars(editedUser.tier)}
                  </div>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-xl font-semibold text-[#213f7d]">
                  ₦{editedUser.accountBalance.toLocaleString()}.00
                </p>
                <p className="text-sm text-gray-600">
                  {editedUser.accountNumber}/{editedUser.bankName}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="socials">Socials</TabsTrigger>
            <TabsTrigger value="guarantor">Guarantor</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={editedUser.firstName}
                      onChange={(e) => setEditedUser({...editedUser, firstName: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.firstName}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={editedUser.lastName}
                      onChange={(e) => setEditedUser({...editedUser, lastName: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.lastName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phoneNumber"
                      value={editedUser.phoneNumber}
                      onChange={(e) => setEditedUser({...editedUser, phoneNumber: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="bvn">BVN</Label>
                  {isEditing ? (
                    <Input
                      id="bvn"
                      value={editedUser.bvn}
                      onChange={(e) => setEditedUser({...editedUser, bvn: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.bvn}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  {isEditing ? (
                    <Select value={editedUser.gender} onValueChange={(value: User['gender']) => setEditedUser({...editedUser, gender: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.gender}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  {isEditing ? (
                    <Select value={editedUser.maritalStatus} onValueChange={(value: User['maritalStatus']) => setEditedUser({...editedUser, maritalStatus: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                        <SelectItem value="Widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.maritalStatus}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  {isEditing ? (
                    <Select value={editedUser.status} onValueChange={(value: User['status']) => setEditedUser({...editedUser, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Blacklisted">Blacklisted</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={getStatusColor(editedUser.status)}>
                      {editedUser.status}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Education & Employment</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="levelOfEducation">Level of Education</Label>
                  {isEditing ? (
                    <Input
                      id="levelOfEducation"
                      value={editedUser.levelOfEducation}
                      onChange={(e) => setEditedUser({...editedUser, levelOfEducation: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.levelOfEducation}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="employmentStatus">Employment Status</Label>
                  {isEditing ? (
                    <Input
                      id="employmentStatus"
                      value={editedUser.employmentStatus}
                      onChange={(e) => setEditedUser({...editedUser, employmentStatus: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.employmentStatus}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="sectorOfEmployment">Sector of Employment</Label>
                  {isEditing ? (
                    <Input
                      id="sectorOfEmployment"
                      value={editedUser.sectorOfEmployment}
                      onChange={(e) => setEditedUser({...editedUser, sectorOfEmployment: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.sectorOfEmployment}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="durationOfEmployment">Duration of Employment</Label>
                  {isEditing ? (
                    <Input
                      id="durationOfEmployment"
                      value={editedUser.durationOfEmployment}
                      onChange={(e) => setEditedUser({...editedUser, durationOfEmployment: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.durationOfEmployment}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="officeEmail">Office Email</Label>
                  {isEditing ? (
                    <Input
                      id="officeEmail"
                      type="email"
                      value={editedUser.officeEmail}
                      onChange={(e) => setEditedUser({...editedUser, officeEmail: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.officeEmail}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="monthlyIncome">Monthly Income</Label>
                  {isEditing ? (
                    <Input
                      id="monthlyIncome"
                      value={editedUser.monthlyIncome}
                      onChange={(e) => setEditedUser({...editedUser, monthlyIncome: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.monthlyIncome}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="socials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  {isEditing ? (
                    <Input
                      id="twitter"
                      value={editedUser.twitter}
                      onChange={(e) => setEditedUser({...editedUser, twitter: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.twitter}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  {isEditing ? (
                    <Input
                      id="facebook"
                      value={editedUser.facebook}
                      onChange={(e) => setEditedUser({...editedUser, facebook: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.facebook}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  {isEditing ? (
                    <Input
                      id="instagram"
                      value={editedUser.instagram}
                      onChange={(e) => setEditedUser({...editedUser, instagram: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.instagram}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guarantor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Guarantor Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guarantorName">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="guarantorName"
                      value={editedUser.guarantor.fullName}
                      onChange={(e) => setEditedUser({
                        ...editedUser,
                        guarantor: {...editedUser.guarantor, fullName: e.target.value}
                      })}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.guarantor.fullName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="guarantorPhone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="guarantorPhone"
                      value={editedUser.guarantor.phoneNumber}
                      onChange={(e) => setEditedUser({
                        ...editedUser,
                        guarantor: {...editedUser.guarantor, phoneNumber: e.target.value}
                      })}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.guarantor.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="guarantorEmail">Email</Label>
                  {isEditing ? (
                    <Input
                      id="guarantorEmail"
                      type="email"
                      value={editedUser.guarantor.email}
                      onChange={(e) => setEditedUser({
                        ...editedUser,
                        guarantor: {...editedUser.guarantor, email: e.target.value}
                      })}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.guarantor.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="guarantorRelationship">Relationship</Label>
                  {isEditing ? (
                    <Input
                      id="guarantorRelationship"
                      value={editedUser.guarantor.relationship}
                      onChange={(e) => setEditedUser({
                        ...editedUser,
                        guarantor: {...editedUser.guarantor, relationship: e.target.value}
                      })}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{editedUser.guarantor.relationship}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};