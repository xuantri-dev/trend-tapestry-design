
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const faqCategories = [
    {
      title: "Orders & Shipping",
      questions: [
        {
          id: "shipping-1",
          question: "How long does shipping take?",
          answer: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. Free shipping is available on orders over $75."
        },
        {
          id: "shipping-2",
          question: "Do you ship internationally?",
          answer: "Yes, we ship to over 50 countries worldwide. International shipping times vary by location, typically 7-14 business days."
        },
        {
          id: "shipping-3",
          question: "Can I track my order?",
          answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order in your account under 'Order History'."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      questions: [
        {
          id: "returns-1",
          question: "What is your return policy?",
          answer: "We offer 30-day returns on unworn items with original tags. Items must be in original condition for a full refund."
        },
        {
          id: "returns-2",
          question: "How do I start a return?",
          answer: "Log into your account, go to 'Order History', and click 'Return Items' next to your order. Print the prepaid return label and ship it back to us."
        },
        {
          id: "returns-3",
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 3-5 business days after we receive your return. The refund will appear on your original payment method."
        }
      ]
    },
    {
      title: "Payment & Pricing",
      questions: [
        {
          id: "payment-1",
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay."
        },
        {
          id: "payment-2",
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your credit card details on our servers."
        },
        {
          id: "payment-3",
          question: "Do you offer price matching?",
          answer: "We don't offer price matching, but we regularly run sales and promotions. Sign up for our newsletter to be notified of special offers."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to common questions about our products and services</p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {category.questions.map((faq) => (
                  <Collapsible key={faq.id}>
                    <CollapsibleTrigger
                      className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => toggleItem(faq.id)}
                    >
                      <span className="font-medium">{faq.question}</span>
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform ${
                          openItems.includes(faq.id) ? 'rotate-180' : ''
                        }`} 
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4 text-gray-600">
                      {faq.answer}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">Contact our customer support team for personalized assistance</p>
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> support@luxe.com</p>
              <p><span className="font-medium">Phone:</span> 1-800-LUXE-HELP</p>
              <p><span className="font-medium">Hours:</span> Mon-Fri 9AM-6PM EST</p>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
