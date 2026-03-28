import { algorithmsData } from "../data/algorithms"

function DescriptionPanel({selectedAgo}) {
    const algo = algorithmsData[selectedAgo]

    if (!algo) return null; // safety
    return(
        <div className="p-4 border border-0 rounded-xl">
            <h2 className="text-lg  font-bold ">
                {algo.name}
            </h2>

            <p className="text-m font-light whitespace-pre-line"
                dangerouslySetInnerHTML={{__html: algo.description}}>
             
            </p>
        </div>
    )
}

export default DescriptionPanel