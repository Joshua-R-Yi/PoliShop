import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Image,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';

import QuantityAdjuster from './QuantityAdjuster';

export default function ProductCardDetailed({ product }) {
  return (
    <div>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        variant='outline'
        border={'solid'}
        borderColor={'gray.200'}
        className='flex flex-row justify-between'
      >
        <Image
          objectFit='cover'
          maxW={{ base: '80%', sm: '200px' }}
          src={product.img}
          alt={product.alt}
        />

        <div className='flex flex-col items-center justify-center'>
          <CardBody w={'80%'}>
            <Heading size='md' className='text-wrap'>
              {product.productname}
            </Heading>
            <Stat>
              <StatNumber>${product.price.toLocaleString()}</StatNumber>
              <StatLabel>Discount:</StatLabel>
              <StatHelpText>
                <StatArrow type='decrease' />$
                {product.discount.toLocaleString()}
              </StatHelpText>
            </Stat>
          </CardBody>

          <CardFooter>
            <QuantityAdjuster product={product} />
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
