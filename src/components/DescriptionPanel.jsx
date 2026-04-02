import { algorithmsData } from "../data/algorithms"

function DescriptionPanel({selectedAgo}) {
    const algo = algorithmsData[selectedAgo]

    if (!algo) return null; // safety
    return(
        <div className="p-4 border border-0 rounded-xl">
            <h2 className="text-lg  font-bold text-white align-center text-shadow-2xl drop-shadow-2xl drop-shadow-2xl text-shadow-amber-500">
                {algo.name}
            </h2>

            <p className="text-m font-light whitespace-pre-line text-white/80 mt-2 text-shadow-2xl text-shadow-amber-500"
                dangerouslySetInnerHTML={{__html: algo.description}}>
             
            </p>
        </div>
    )
}

export default DescriptionPanel