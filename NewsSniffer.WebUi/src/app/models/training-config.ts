export interface TrainingConfig {
    cutoffRank: number;
    similarnessRank: number;
    exclusionList: string[];
    model: string;
    bayasPositiveGage: number;
    bayasNegativeGage: number;
    bayasMode: string;
}