export class Analytics {
    overall!: {
        positive: number;
        negative: number;
        neuteral: number;
    };
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
}