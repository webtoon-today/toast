import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import scss from "rollup-plugin-scss";

export default [
    {
        input: 'src/main.js',
        output: {
            file: './dist/bundle.js',
            format: 'cjs'
        },
        plugins: [
            typescript({ tsconfig: './tsconfig.json' }),
            scss(),
        ]
    },
    {
        input: 'src/main.js',
        output: {
            file: './dist/dts/index.d.ts',
            format: 'es'
        },
        plugins: [
            dts(),
            scss()
        ]
    }
];