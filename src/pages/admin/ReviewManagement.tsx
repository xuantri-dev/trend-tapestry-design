
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Trash2, Eye, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MockReview {
  id: string;
  product_id: string;
  product_name: string;
  customer_name: string;
  customer_email: string;
  rating: number;
  review_text: string;
  created_at: string;
  is_featured: boolean;
  status: 'approved' | 'pending' | 'rejected';
}

const ReviewManagement = () => {
  const [reviews, setReviews] = useState<MockReview[]>([
    {
      id: 'review-1',
      product_id: 'prod-1',
      product_name: 'Premium Cotton T-Shirt',
      customer_name: 'John Doe',
      customer_email: 'john.doe@example.com',
      rating: 5,
      review_text: 'Amazing quality! The fabric is soft and the fit is perfect. Highly recommend this t-shirt.',
      created_at: '2023-11-28T14:30:00Z',
      is_featured: true,
      status: 'approved'
    },
    {
      id: 'review-2',
      product_id: 'prod-2',
      product_name: 'Designer Leather Jacket',
      customer_name: 'Jane Smith',
      customer_email: 'jane.smith@example.com',
      rating: 4,
      review_text: 'Great jacket, looks exactly like the photos. Fast shipping too!',
      created_at: '2023-11-25T10:15:00Z',
      is_featured: false,
      status: 'approved'
    },
    {
      id: 'review-3',
      product_id: 'prod-3',
      product_name: 'Wireless Headphones',
      customer_name: 'Mike Johnson',
      customer_email: 'mike.johnson@example.com',
      rating: 3,
      review_text: 'Sound quality is decent but could be better for the price point.',
      created_at: '2023-11-22T16:45:00Z',
      is_featured: false,
      status: 'pending'
    },
    {
      id: 'review-4',
      product_id: 'prod-1',
      product_name: 'Premium Cotton T-Shirt',
      customer_name: 'Sarah Wilson',
      customer_email: 'sarah.wilson@example.com',
      rating: 5,
      review_text: 'Love this shirt! Perfect for everyday wear and the quality is outstanding.',
      created_at: '2023-11-20T09:20:00Z',
      is_featured: false,
      status: 'approved'
    },
    {
      id: 'review-5',
      product_id: 'prod-4',
      product_name: 'Classic Sneakers',
      customer_name: 'Alex Brown',
      customer_email: 'alex.brown@example.com',
      rating: 2,
      review_text: 'Not what I expected. The sizing runs small and the material feels cheap.',
      created_at: '2023-11-18T11:30:00Z',
      is_featured: false,
      status: 'rejected'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const { toast } = useToast();

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review_text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const handleToggleFeatured = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, is_featured: !review.is_featured }
        : review
    ));
    toast({
      title: "Review Updated",
      description: "Review featured status has been changed"
    });
  };

  const handleStatusChange = (reviewId: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { ...review, status: newStatus } : review
    ));
    toast({
      title: "Review Status Updated",
      description: `Review status has been changed to ${newStatus}`
    });
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
    toast({
      title: "Review Deleted",
      description: "Review has been removed successfully"
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Management</h1>
          <p className="text-gray-600">Moderate and manage customer reviews</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold">{reviews.length}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold">
                    {reviews.filter(r => r.status === 'pending').length}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Featured</p>
                  <p className="text-2xl font-bold">
                    {reviews.filter(r => r.is_featured).length}
                  </p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold">
                    {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search reviews by product, customer, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reviews ({filteredReviews.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="font-medium">{review.product_name}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{review.customer_name}</div>
                        <div className="text-sm text-gray-500">{review.customer_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="ml-1 text-sm">({review.rating})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm line-clamp-2">{review.review_text}</p>
                        {review.is_featured && (
                          <Badge variant="secondary" className="mt-1">
                            <Award className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(review.created_at)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(review.status)}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant={review.is_featured ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleToggleFeatured(review.id)}
                        >
                          <Award className="h-4 w-4" />
                        </Button>
                        <Select
                          value={review.status}
                          onValueChange={(value: 'approved' | 'pending' | 'rejected') => 
                            handleStatusChange(review.id, value)
                          }
                        >
                          <SelectTrigger className="w-24 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approved">Approve</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="rejected">Reject</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewManagement;
