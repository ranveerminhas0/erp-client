// Mock Data for the ERP System

export type Product = {
  id: string;
  serialNo: string;
  name: string;
  alias: string;
  unit: 'PCS' | 'WEIGHT';
  size: string;
  hsn: string;
  gst: number;
  itcAvailable: boolean;
  group: string;
  category: string;
  mrp: number;
  sellingPrice: number;
  stock: number;
};

export type Customer = {
  id: string;
  name: string;
  mobile: string;
  address: string;
  dob?: string;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    serialNo: '1001',
    name: 'SS Cooking Pot 5L',
    alias: 'POT-5L',
    unit: 'PCS',
    size: '5L',
    hsn: '7323',
    gst: 18,
    itcAvailable: true,
    group: 'Kitchen King',
    category: 'Utensils',
    mrp: 1200,
    sellingPrice: 950,
    stock: 50
  },
  {
    id: '2',
    serialNo: '1002',
    name: 'Plastic Bucket 20L',
    alias: 'BKT-20',
    unit: 'PCS',
    size: '20L',
    hsn: '3924',
    gst: 18,
    itcAvailable: true,
    group: 'Plasto World',
    category: 'Plastic',
    mrp: 350,
    sellingPrice: 280,
    stock: 120
  },
  {
    id: '3',
    serialNo: '1003',
    name: 'Dinner Set 32pc',
    alias: 'DS-32',
    unit: 'PCS',
    size: 'Standard',
    hsn: '6911',
    gst: 12,
    itcAvailable: true,
    group: 'Royal Crockery',
    category: 'Crockery',
    mrp: 4500,
    sellingPrice: 3800,
    stock: 15
  },
  {
    id: '4',
    serialNo: '1004',
    name: 'Steel Container Set',
    alias: 'CONT-S',
    unit: 'WEIGHT',
    size: 'Small',
    hsn: '7323',
    gst: 12,
    itcAvailable: true,
    group: 'Kitchen King',
    category: 'Utensils',
    mrp: 800,
    sellingPrice: 600,
    stock: 250 // In weight logic this might be grams or kg, keeping simple for now
  },
  {
    id: '5',
    serialNo: '1005',
    name: 'Copper Bowl (Premium)',
    alias: 'CB-PREM',
    unit: 'WEIGHT',
    size: 'Variable',
    hsn: '7418',
    gst: 18,
    itcAvailable: true,
    group: 'Kitchen King',
    category: 'Utensils',
    mrp: 1500,
    sellingPrice: 1100,
    stock: 100
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Rahul Kumar', mobile: '9876543210', address: '123 Market St, Jalandhar', dob: '1990-01-01' },
  { id: '2', name: 'Priya Singh', mobile: '8765432109', address: '45 Model Town, Jalandhar' },
];

export const MOCK_DAILY_STATS = {
  totalSales: 154000,
  cashSales: 45000,
  upiSales: 85000,
  cardSales: 24000,
  creditSales: 0,
  cashInHand: 42500,
};
