import React from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { DiscountCoupon } from '../../components/DiscountCoupon';
import { Ticket, Scissors } from 'lucide-react';

const Home: React.FC = () => {

const items = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="flex h-screen">
      <div className="gap-4 flex flex-col w-full">
        <DiscountCoupon
     code="SUMMER2023"
        discount={20}
        description="20% off on all summer items"
        expirationDate="2023-08-31"
        />

        <div className="max-w-[30rem] rounded-lg h-[11rem] bg-white ">
          <div className="bg-white h-[70%] flex items-center p-3 border w-full rounded-b-lg border-b-0 shadow-md rounded-t-xl">
            <div className="bg-red-400 h-[6rem] w-[6rem] rounded-md"/>
          </div>
          <div className="bg-gray-50 h-[30%] w-full border border-t-0 shadow-md rounded-t-lg rounded-b-xl relative flex items-center justify-center">
            <div className="border-t w-[90%] border-dashed border-gray-400 bg-red-100 absolute top-0">
              <Scissors className="top-0 absolute -translate-y-3 -left-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
