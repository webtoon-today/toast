import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import scss from "rollup-plugin-scss";

export default [
    {
        input: 'src/main.js',
        output: {
            file: './index.js',
            format: 'cjs'
        },
        plugins: [
            typescript({ tsconfig: './tsconfig.json' }),
            scss({
                output: true,
                failOnError: true,
                outputStyle: "compressed",
                fileName: "index.css",
            })
        ]
    },
    {
        input: 'src/main.js',
        output: {
            file: './index.d.ts',
            format: 'es'
        },
        plugins: [
            dts(),
            scss({
                output: true,
                failOnError: true,
                outputStyle: "compressed",
                fileName: "index.css",
            })
        ]
    }
];