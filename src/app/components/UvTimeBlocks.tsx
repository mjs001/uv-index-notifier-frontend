import "../styles/location.css";

export default function UvTimeBlocks({ uvTimeData }: { uvTimeData: string[] }) {
    return (
        <div className="uvBlocksContainer gap-4 mt-4 mb-4">
            {uvTimeData.map((uv, i) => <div className="uvBlock md:w-[22vw] sm:w-[40vw] w-[60vw] h-[60px] p-2" key={i}><h1 className="lg:text-2xl md:text-xl sm:text-lg text-md m-1 text-center">{uv}</h1></div>)}
        </div>
    )
}