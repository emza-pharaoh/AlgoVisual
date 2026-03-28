import { algorithmsData } from "../data/algorithms";

export default function CodePanel({selectedAlgo}) {
    const algo =algorithmsData[selectedAlgo]

    return(
        <div className="p-4 border rounded-xl bg-black text-green-400 overflow-auto">
            <pre className="text-xs whitespace-pre-wrap">
                {algo.code}
            </pre>
        </div>
    )
}