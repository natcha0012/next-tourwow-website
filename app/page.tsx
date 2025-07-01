import Banner from "@/components/Banner/Banner";
import HomepageSeoArticle from "@/components/HomPageSeoArticle/HomePageSeoArticle";
import PopularCountry from "@/components/PopularCountry/PopularCountry";
import TopArticle from "@/components/TopArticles/TopArticles";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <PopularCountry></PopularCountry>
      <TopArticle></TopArticle>
      <HomepageSeoArticle></HomepageSeoArticle>
    </div>
  );
}
