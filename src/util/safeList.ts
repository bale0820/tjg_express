    export const safeList = (arr: any, size: number): number[] => {
            if (!Array.isArray(arr)) return new Array(size).fill(0);

            return arr.slice(0, size).map(n => Number(n) || 0);
        };
