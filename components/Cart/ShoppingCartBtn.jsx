'use client';
import NextLink from 'next/link';
import { useEffect } from 'react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  IconButton,
  Text,
  Container,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

import { useSelector } from 'react-redux';

import ClearCartBtn from '../../components/Cart/EmptyCartBtn';
import CartIsEmpty from './CartIsEmpty';
import ProductCardDetailed from '../Products/ProductCardDetailed';

const handleClearCart = function () {
  localStorage.clear();
};

export default function ShoppingCartBtn() {
  const cartItemCount = useSelector((state) => state.cart.cartItemCount);
  const cartCost = useSelector((state) => state.cart.totalPrice);
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <Popover trigger='hover'>
        <PopoverTrigger>
          <div>
            <IconButton
              variant='outline'
              border='hidden'
              aria-label='Shopping Cart'
              fontSize='35px'
              color='#3182ce'
              icon={<FaShoppingCart />}
            ></IconButton>
            {cartItemCount > 0 ? (
              <span className='absolute bg-red-400 rounded-md w-5 h-5 p-0.5 text-center text-xs text-white'>
                {cartItemCount}
              </span>
            ) : (
              <></>
            )}
          </div>
        </PopoverTrigger>
        {cartItemCount > 0 ? (
          <div className='z-[999999]'>
            <PopoverContent
              width={'500px'}
              height={'400px'}
              // maxW={{ sm: '200px' }}
            >
              <div className='flex flex-col justify-evenly items-center'>
                <PopoverHeader>
                  <div className='flex flex-row justify-between items-center gap-20'>
                    <Text fontSize='xl'>
                      {cartItemCount} item{cartItemCount == 1 ? '' : 's'} in
                      cart
                    </Text>
                    <NextLink href='/cart' passHref>
                      <Button colorScheme={'blue'}>Go to cart</Button>
                    </NextLink>
                  </div>
                </PopoverHeader>
                <PopoverBody>
                  <Container maxW='container.lg' flexBasis='3/4'>
                    <Box
                      display='flex'
                      flexDirection='column'
                      overflowY='auto'
                      height='270px' // Set the height to trigger vertical scrolling
                      borderRadius='lg'
                    >
                      {cartItemCount > 0 ? (
                        <div className='max-h-[50px]'>
                          {cartItems.map((curr, idx) => {
                            return (
                              <ProductCardDetailed
                                product={curr}
                                key={idx}
                              ></ProductCardDetailed>
                            );
                          })}
                        </div>
                      ) : (
                        <CartIsEmpty></CartIsEmpty>
                      )}
                    </Box>
                  </Container>
                </PopoverBody>
                <PopoverFooter>
                  <div className='flex gap-10 items-center'>
                    <Text fontSize='xl'>
                      Current Cart Cost: ${cartCost.toFixed(2)}
                    </Text>
                    <ClearCartBtn />
                  </div>
                </PopoverFooter>
              </div>
            </PopoverContent>
          </div>
        ) : (
          <div className='z-[999999]'>
            <PopoverContent width={'500px'} height={'300px'}>
              <PopoverBody>
                <CartIsEmpty></CartIsEmpty>
              </PopoverBody>
            </PopoverContent>
          </div>
        )}
      </Popover>
    </>
  );
}
