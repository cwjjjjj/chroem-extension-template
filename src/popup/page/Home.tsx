import Memorandum from "../components/Memorandum";
import Search from "../components/Search";
import GridLayout, {
  Responsive as ResponsiveGridLayout,
} from "react-grid-layout";
import V2exHotList from "../components/V2exHotList";

const layout = [
  { i: "a", x: 0, y: 0, w: 4, h: 2 },
  { i: "b", x: 0, y: 1, w: 2, h: 6, minW: 2, maxW: 4, minH: 6 },
  { i: "c", x: 0, y: 2, w: 4, h: 10, minH: 6 },
];

export default function Home() {
  return (
    <div className="p-[10px] overflow-auto">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="a" className=" bg-[red]">
          <Search />
        </div>
        <div key="b" className=" bg-[orange]">
          <Memorandum />
        </div>
        <div key="c" className=" bg-[green]">
          <V2exHotList />
        </div>
      </GridLayout>
    </div>
  );
}
