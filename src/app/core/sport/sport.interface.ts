export interface ISport {
    name: string;
    $key: string;
}

export interface ISportPerCountry {
    sport: {
        name: string;
        key: string;
    };
    country: {
        name: string;
        code: string;
        key: string;
    }
}