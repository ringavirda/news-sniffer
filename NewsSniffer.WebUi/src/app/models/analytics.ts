export class Analytics {
    perTime!: [{
            outlet: string;
            daily: [{
                    date: Date;
                    value: {
                        positive: number;
                        negative: number;
                        neuteral: number;
                    };
                }
            ];
        }
    ];
    overall!: {
        positive: number;
        negative: number;
        neuteral: number;
    };
}