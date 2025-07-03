import Banner from "@/app/components/Banner/Banner";
import HomepageSeoArticle from "@/app/components/HomPageSeoArticle/HomePageSeoArticle";
import PopularCountry from "@/app/components/PopularCountry/PopularCountry";
import TopArticle from "@/app/components/TopArticles/TopArticles";

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
