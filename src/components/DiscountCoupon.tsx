import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Ticket, Scissors } from 'lucide-react';

interface DiscountCouponProps {
  code: string;
  discount: number;
  description: string;
  expirationDate: string;
  onUse?: () => void;
}

export const DiscountCoupon: React.FC<DiscountCouponProps> = ({
  code,
  discount,
  description,
  expirationDate,
  onUse,
}) => {
  return (
    <Card className="w-64 overflow-hidden">
      <CardHeader
        color="blue"
        className="relative h-24 flex items-center justify-center"
        floated={false}
      >
        <Ticket className="w-16 h-16 text-white" />
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="w-1/2 h-4 bg-white rounded-t-full" />
        </div>
      </CardHeader>
      <CardBody className="text-center px-6 pt-6 pb-2">
        <Typography variant="h3" color="blue-gray" className="mb-2 font-bold">
          {discount}% OFF
        </Typography>
        <Typography variant="h6" className="mb-4">
          {code}
        </Typography>
        <Typography className="mb-4 text-sm">
          {description}
        </Typography>
        <div className="border-t border-dashed border-gray-300 my-4 relative">
          <Scissors className="absolute top-1/2 -translate-y-1/2 -right-3 text-gray-400" />
        </div>
        <Button size="sm" color="blue" fullWidth onClick={onUse}>
          Use Coupon
        </Button>
      </CardBody>
      <CardFooter className="pt-0 pb-4 px-6">
        <Typography variant="small" color="gray" className="flex justify-center items-center gap-1">
          Expires on: {expirationDate}
        </Typography>
      </CardFooter>
    </Card>
  );
};
