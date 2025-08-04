import RecentViewedSwiper from "@/components/recent-viewed-swiper";
import RandomRecipe from "../components/random-recipe";

export default function Home() {
  return (
   <>
    <section className="">
      <RandomRecipe />
    </section>
    <section>
      <RecentViewedSwiper />
    </section>
   </>
  );
}
