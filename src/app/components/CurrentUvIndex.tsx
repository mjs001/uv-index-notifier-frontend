import "../styles/location.css"

export default function CurrentUvIndex({ uvIndex }: { uvIndex: number }) {

    function uvContainerColor() {
        switch (true) {
            case uvIndex < 3:
                return "#97D700";
            case uvIndex >= 3 && uvIndex < 6:
                return "#FCE300";
            case uvIndex >= 6 && uvIndex < 8:
                return "#FF8200";
            case uvIndex >= 8 && uvIndex < 11:
                return "#EF3340";
            case uvIndex >= 11:
                return "#9063CD";
        }
    }

    return <div className="current-uv-index-container md:w-[100px] md:h-[100px] w-[80px] h-[80px] w justify-items-start flex-col flex items-center justify-center ml-3 mt-3 flex-wrap text-center" style={{ backgroundColor: uvContainerColor() }}><h1>UV Index</h1><h1 className="text-4xl">{uvIndex}</h1></div>
}