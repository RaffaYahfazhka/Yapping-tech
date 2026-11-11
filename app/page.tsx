import { CartDrawer } from "@/components/CartDrawer";
import { DemoControlDock } from "@/components/DemoControlDock";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TemplateStage } from "@/components/TemplateStage";
import { ShowcaseProvider } from "@/context/ShowcaseContext";

export default function HomePage() {
  return (
    <ShowcaseProvider basePath="/templates">
      <DemoControlDock />
      <TemplateStage />
      <CartDrawer />
      <ScrollToTop />
    </ShowcaseProvider>
  );
}
