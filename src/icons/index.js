import Vue from "vue";
import SvgIcon from "./SvgIcon";

Vue.component('svg-icon',SvgIcon);
/*
* require.context 读取目录的所有文件
*
* */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)