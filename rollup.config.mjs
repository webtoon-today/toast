import typescript from "@rollup/plugin-typescript";
import scss from "rollup-plugin-scss";

export default {
    input: 'src/main.js',
    output: {
        file: './dist/bundle.js',
        format: 'cjs'
    },
    plugins: [
        typescript({ tsconfig: './tsconfig.json' }),
        scss()
    ]
};