import { ItemCategories } from '@/firebase/models';

export default function isItemCategory(category: any): category is ItemCategories {
  return category !== undefined;
}
