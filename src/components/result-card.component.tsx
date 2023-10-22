import { Typography, Skeleton } from "antd";
import { Codes, Result } from "../utils/API/API";
import React from "react";

type result = {
    codes: Codes;
    currencyData: Result;
}

type ResultProps = {
    loading : boolean;
    data: result;
    amount: number;
}

const ResultCard: React.FC<ResultProps> = ({loading, data, amount}) => {
    const last_updated = `${data?.currencyData?.last_updated}`
    return (
        <Skeleton loading={loading}>
            <div className="result-card-container">
                <Typography.Title className="result-base" level={5}>{amount} {data?.currencyData?.base} ({data?.codes[data?.currencyData?.base]}) =</Typography.Title>
                <Typography.Title className="result-target" level={2}>{data?.currencyData?.conversion_result} {data?.currencyData?.target} ({data?.codes[data?.currencyData?.target]})</Typography.Title>
                <span className="result-date">Last updated on: {last_updated}</span>
            </div>
        </Skeleton>
    )
}

export default ResultCard;