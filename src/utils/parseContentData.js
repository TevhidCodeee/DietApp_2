export default function parseContentData(data, isNestedStructure = false) {
  // Veri yoksa boş dizi dön
  if (!data) {
    return [];
  }

  try {
    if (isNestedStructure) {
      // History sayfası için iç içe yapı işledik
      const flattenedData = [];
      
      Object.keys(data).forEach(categoryKey => {
        const category = data[categoryKey];
        
        Object.keys(category).forEach(itemKey => {
          const item = category[itemKey];
          
          if (item && item.date && item.text && item.username) {
            flattenedData.push({
              id: `${categoryKey}_${itemKey}`,
              categoryId: categoryKey,
              itemId: itemKey,
              date: item.date,
              text: item.text,
              username: item.username
            });
          }
        });
      });

      return flattenedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      // Diet Plans sayfası için 
      return Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
    }
  } catch (error) {
    console.error('Error in parseContentData:', error);
    return [];
  }
}