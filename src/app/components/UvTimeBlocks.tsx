import "../styles/location.css";

export default function UvTimeBlocks({ uvTimeData }: { uvTimeData: string[] }) {
    return (
        <div className="uvBlocksContainer gap-4 mt-4">
            {uvTimeData.map((uv, i) => <div className="uvBlock w-[18vw] h-[10vh] p-2" key={i}><h1 className="lg:text-2xl md:text-xl sm:text-lg text-xs m-1">{uv}</h1></div>)}
        </div>)
}