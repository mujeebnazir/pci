"use client";
import React, { useState } from "react";
import { useCartStore } from "../../zustand/cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  User,
  MapPin,
  CreditCard,
  ShoppingBag,
  Package2,
  ChevronRight,
  Truck,
  CheckCircle2,
  Wallet,
  Phone,
  Mail,
  Building2,
  MapPinned,
  HomeIcon,
  DollarSign,
  BadgePercent,
  ChevronLeft,
  CreditCard as CardIcon,
  Badge,
} from "lucide-react";
import useAuthStore from "@/zustand/authStore";
import OrderService from "@/lib/orders";
import { PaymentMode, Status } from '@/lib/orders';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const CheckoutStep = ({ step, currentStep, title, icon: Icon }: any) => (
  <div
    className={`flex items-center ${
      currentStep >= step ? "text-primary" : "text-gray-400"
    }`}
  >
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center
      ${currentStep >= step ? "bg-primary text-white" : "bg-gray-100"}`}
    >
      {currentStep > step ? <CheckCircle2 size={16} /> : <Icon size={16} />}
    </div>
    <span className="ml-2 font-medium">{title}</span>
    {step < 3 && <ChevronRight className="mx-2" size={16} />}
  </div>
);

const InputWithIcon = ({
  icon: Icon,
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}: any) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="flex items-center gap-2">
      <Icon size={16} className="text-gray-500" />
      {label}
    </Label>
    <Input 
      id={id} 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const PaymentMethodCard = ({ icon: Icon, title, description, value, selected, onSelect }: any) => (
  <div 
    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${selected ? 'border-primary' : ''}`}
    onClick={() => onSelect(value)}
  >
    <div className="flex items-center space-x-4 flex-1">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon className={`${selected ? 'text-primary' : 'text-gray-600'}`} size={20} />
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<PaymentMode>(PaymentMode.COD);
  const { items, totalMRP, discountOnMRP, deliveryFee, totalAmount } = useCartStore((state) => state);
  const {session} = useAuthStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (step === 1) {
      if (!personalInfo.firstName.trim()) {
        toast.error("First name is required");
        return false;
      }
      if (!personalInfo.lastName.trim()) {
        toast.error("Last name is required");
        return false;
      }
      if (!personalInfo.email.trim()) {
        toast.error("Email is required");
        return false;
      }
      if (!personalInfo.phone.trim()) {
        toast.error("Phone number is required");
        return false;
      }
    } else if (step === 2) {
      if (!shippingAddress.address.trim()) {
        toast.error("Street address is required");
        return false;
      }
      if (!shippingAddress.city.trim()) {
        toast.error("City is required");
        return false;
      }
      if (!shippingAddress.state.trim()) {
        toast.error("State is required");
        return false;
      }
      if (!shippingAddress.postalCode.trim()) {
        toast.error("Postal code is required");
        return false;
      }
      if (!shippingAddress.country.trim()) {
        toast.error("Country is required");
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!session?.$id || !session?.cartId) {
      toast.error("Please login to place order");
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    console.log("items", items);
    const cartItemIds = items.map(item => item.id).filter((id): id is string => id !== undefined);
    console.log("cartItemIds", cartItemIds);

    const orderData = {
      user: session.$id,
      cartItem: cartItemIds,
      paymentMode: selectedPaymentMode,
      status: Status.PENDING,
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      email: personalInfo.email,
      phoneNumber: personalInfo.phone,
      streetAddress: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state,
      postalCode: shippingAddress.postalCode,
      country: shippingAddress.country,
    };

    try {
      const response = await OrderService.createOrderItem(orderData);
      toast.success("Order placed successfully!");
      console.log("response", response);
    } catch (error: any) {
      toast.error(error.message || "Error placing order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, section: string) => {
    const { id, value } = e.target;
    if (section === "personalInfo") {
      setPersonalInfo({ ...personalInfo, [id]: value });
    } else if (section === "shippingAddress") {
      setShippingAddress({ ...shippingAddress, [id]: value });
    }
  };

  const handleContinue = () => {
    if (!validateForm()) return;
    if (step === 3) {
      handlePlaceOrder();
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 mt-5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <ShoppingBag className="text-primary" size={28} />
            <h1 className="text-3xl font-bold text-center">Checkout</h1>
          </div>
          <div className="flex justify-center items-center mb-4 ">
            <CheckoutStep
              step={1}
              currentStep={step}
              title="Information"
              icon={User}
            />
            <CheckoutStep
              step={2}
              currentStep={step}
              title="Shipping"
              icon={Truck}
            />
            <CheckoutStep
              step={3}
              currentStep={step}
              title="Payment"
              icon={CreditCard}
            />
          </div>
          <Progress value={step * 33.33} className="h-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Order Summary - Now with mobile-first ordering */}
          <div className="lg:col-span-4 space-y-6 order-first lg:order-last">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package2 className="text-primary" size={20} />
                    <CardTitle>Order Summary</CardTitle>
                  </div>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    {items.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-4 border rounded-lg"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {item.product.name}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            <p className="font-semibold">
                              ₹{item.product.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Package2 className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-gray-500">Your cart is empty</p>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <DollarSign size={14} />
                      Total MRP
                    </span>
                    <span>₹{totalMRP}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <BadgePercent size={14} />
                      Discount
                    </span>
                    <span className="text-green-600">-₹{discountOnMRP}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Truck size={14} />
                      Delivery Fee
                    </span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="flex items-center gap-2">
                      <CreditCard size={16} />
                      Total Amount
                    </span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>

                {step === 3 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-sm text-gray-600">
                      <Truck size={16} className="mr-2" />
                      Estimated delivery: 3-5 business days
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Forms Section */}
          <div className="lg:col-span-8 space-y-6 order-last lg:order-first">
            {step === 1 && (
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="text-primary" size={24} />
                    <CardTitle className="text-2xl">
                      Personal Information
                    </CardTitle>
                  </div>
                  <p className="text-sm text-gray-500">
                    Please enter your details
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputWithIcon
                      icon={User}
                      label="First Name"
                      id="firstName"
                      placeholder="John"
                      value={personalInfo.firstName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "personalInfo")}
                    />
                    <InputWithIcon
                      icon={User}
                      label="Last Name"
                      id="lastName"
                      placeholder="Doe"
                      value={personalInfo.lastName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "personalInfo")}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputWithIcon
                      icon={Mail}
                      label="Email"
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={personalInfo.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "personalInfo")}
                    />
                    <InputWithIcon
                      icon={Phone}
                      label="Phone Number"
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={personalInfo.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "personalInfo")}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPinned className="text-primary" size={24} />
                    <CardTitle className="text-2xl">Shipping Address</CardTitle>
                  </div>
                  <p className="text-sm text-gray-500">
                    Where should we deliver your order?
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InputWithIcon
                    icon={HomeIcon}
                    label="Street Address"
                    id="address"
                    placeholder="123 Main St"
                    value={shippingAddress.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "shippingAddress")}
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <InputWithIcon
                      icon={Building2}
                      label="City"
                      id="city"
                      placeholder="New York"
                      value={shippingAddress.city}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "shippingAddress")}
                    />
                    <InputWithIcon
                      icon={MapPin}
                      label="State"
                      id="state"
                      placeholder="NY"
                      value={shippingAddress.state}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "shippingAddress")}
                    />
                    <InputWithIcon
                      icon={MapPinned}
                      label="Postal Code"
                      id="postalCode"
                      placeholder="10001"
                      value={shippingAddress.postalCode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "shippingAddress")}
                    />
                  </div>
                  <InputWithIcon
                    icon={MapPin}
                    label="Country"
                    id="country"
                    placeholder="United States"
                    value={shippingAddress.country}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "shippingAddress")}
                  />
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="text-primary" size={24} />
                    <CardTitle className="text-2xl">Payment Method</CardTitle>
                  </div>
                  <p className="text-sm text-gray-500">
                    Cash on Delivery is available
                  </p>
                </CardHeader>
                <CardContent>
                  <PaymentMethodCard
                    icon={Wallet}
                    title="Cash on Delivery"
                    description="Pay when you receive your order"
                    value={PaymentMode.COD}
                    selected={selectedPaymentMode === PaymentMode.COD}
                    onSelect={setSelectedPaymentMode}
                  />
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="w-32"
                >
                  <ChevronLeft size={16} className="mr-2" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleContinue}
                className="ml-auto w-32"
                disabled={items.length === 0 || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin">⚪</span>
                    Loading...
                  </div>
                ) : step === 3 ? (
                  <>
                    Place Order
                    <Package2 size={16} className="ml-2" />
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
