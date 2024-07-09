import React, { useState } from 'react';
import {coupons} from './coupons'
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, Button } from "@material-tailwind/react";
import { Scissors, Ticket } from 'lucide-react';

const UserHome: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);


  const selectedCoupon = coupons.find(coupon => coupon.restaurantName === selectedId);

  return (
    <div className="gap-4 px-2 pb-12 pt-4 flex flex-col w-full h-full overflow-y-scroll">
      {coupons.map((coupon, index) => (
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          layoutId={coupon.restaurantName}
          onClick={() => setSelectedId(coupon.restaurantName)}
          key={coupon.restaurantName}
          className="w-full lg:max-w-[30rem] rounded-lg h-[11rem] cursor-pointer"
        >
          <div className="bg-white h-[70%] flex items-center p-3 border w-full rounded-b-lg border-b-0 shadow-md rounded-t-xl">
            <div className="bg-blue-100 h-[6rem] w-[6rem] rounded-md"/>
            <div className="px-4 flex flex-col">
              <motion.h5 className="text-lg text-gray-900 m-0">{coupon.restaurantName}</motion.h5>
              <motion.h2 className="font-bold m-0 text-blue-gray-900">
                {coupon.discount}% OFF
              </motion.h2>
              <Typography className="m-0 text-gray-800 text-sm">
                Em pedidos a partir de R$ {coupon.minOrderValue}
              </Typography>
            </div>
          </div>
          <div className="bg-white h-[30%] w-full border border-t-0 shadow-md rounded-t-lg rounded-b-xl relative flex items-center justify-center">
            <div className="border-t w-[90%] border-dashed border-gray-400 absolute top-0">
              <Scissors className="top-0 absolute -translate-y-3 -left-3 text-gray-400" />
            </div>
            <div className="w-full h-full p-4 flex justify-between">
              <Typography variant="small" className="text-gray-800">Restam {coupon.remainingCoupons} cupons</Typography>
              <Typography variant="small" className="text-gray-800">Válido até {coupon.validUntil}</Typography>
            </div>
          </div>
        </motion.div>
      ))}

<AnimatePresence>
        {selectedId && selectedCoupon && (
          <>
            <motion.div
              key="modal-background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
            />
            <motion.div
              layoutId={selectedId}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <motion.div
                className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <motion.h5 className="text-xl font-semibold text-gray-900 mb-1">
                        {selectedCoupon.restaurantName}
                      </motion.h5>
                      <motion.h2 className="text-3xl font-bold text-blue-600">
                        {selectedCoupon.discount}% OFF
                      </motion.h2>
                    </div>
                    <Button
                      variant="text"
                      color="gray"
                      onClick={() => setSelectedId(null)}
                      className="p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>

                  <div className="bg-blue-100 w-full h-32 rounded-lg mb-4 flex items-center justify-center">
                    <img
                      src="/path-to-restaurant-image.jpg"
                      alt={selectedCoupon.restaurantName}
                      className="max-h-full max-w-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="mb-4">
                    <Typography variant="small" className="text-gray-600 mb-2">
                      Válido até {selectedCoupon.validUntil}
                    </Typography>
                    <Typography variant="small" className="text-gray-800">
                      Pedido mínimo: R$ {selectedCoupon.minOrderValue}
                    </Typography>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <Typography variant="small" className="text-yellow-800 font-semibold">
                      RESTAM APENAS {selectedCoupon.remainingCoupons} CUPONS!
                    </Typography>
                  </div>

                  <Typography variant="small" className="text-gray-600 mb-6">
                    Use este cupom para aproveitar um desconto incrível no {selectedCoupon.restaurantName}.
                    Não perca esta oportunidade de saborear pratos deliciosos com um ótimo desconto!
                  </Typography>

                  <div className="flex justify-between items-center pt-4 relative ">

            <div className="border-t w-[100%] border-dashed border-gray-400 absolute top-0">
              <Scissors className="top-0 absolute -translate-y-3 -left-3 text-gray-400" />
            </div>
                    <Typography variant="small" className="text-gray-600">
                      Código: <span className="font-mono font-bold">{selectedCoupon.restaurantName.toUpperCase().slice(0, 6)}{selectedCoupon.discount}</span>
                    </Typography>
                    <Button
                      variant="gradient"
                      color="green"
                      onClick={() => {
                        // Handle coupon redemption
                        setSelectedId(null);
                      }}
                      className="flex items-center gap-2"
                    >
                      Resgatar <Ticket className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserHome;
