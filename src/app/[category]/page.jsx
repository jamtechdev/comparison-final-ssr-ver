

export default async function Page({
  params: { category }
}) {

  return (<h1>{category}</h1>);
}
export async function generateMetadata() {
  return {
    title: 'Category Page',
    generator: 'Comparison web',
    applicationName: 'Comparison web',
    referrer: 'origin-when-cross-origin',
    keywords: ['compare', 'product'],
    description: "Category page powerb by comparision web"
  }
}
