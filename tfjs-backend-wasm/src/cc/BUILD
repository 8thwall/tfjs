load("@code8//bzl/js:js.bzl", "jsasm_binary")
load(":build_defs.bzl", "tfjs_cc_library", "tfjs_unit_test")

# Emcripten produces a much larger wasm bundle unless the cc_binary has srcs
# explicitly pointing to files with exported methods (EMSCRIPTEN_KEEPALIVE).
KERNELS_WITH_KEEPALIVE = glob(
    ["kernels/*.cc"],
    exclude = ["**/*_test.cc"],
)

jsasm_binary(
    name = "tfjs-backend-wasm",
    cc_binaries = [":tfjs-backend-wasm-cc"],
    emopts = [
        "TOTAL_MEMORY=32mb",  # Must be a multiple of 16MB.
        "ALLOW_MEMORY_GROWTH=1",
        "DEFAULT_LIBRARY_FUNCS_TO_INCLUDE=[]",
        "SPLIT_MEMORY=0",
        "MODULARIZE=1",
        "EXPORT_NAME=WasmBackendModule",
        "EXTRA_EXPORTED_RUNTIME_METHODS=[GL,stringToUTF8,writeArrayToMemory]",
        "EXPORTED_FUNCTIONS=[_malloc,_free]",
        "EXTRA_EXPORTED_RUNTIME_METHODS=[cwrap]",
        "MALLOC=emmalloc",
    ],
    html = 0,
    single_file = 1,
    wasm = 1,
)

cc_binary(
    name = "tfjs-backend-wasm-cc",
    srcs = ["backend.cc"] + KERNELS_WITH_KEEPALIVE,
    deps = [
        ":all_kernels",
        ":backend",
    ],
    copts = [
        "-Iexternal/tfjs/tfjs-backend-wasm",
        "-Wno-unused-variable",
    ],
)

test_suite(
    name = "cc_tests",
)

## Library

tfjs_cc_library(
    name = "backend",
    srcs = ["backend.cc"],
    hdrs = ["backend.h"],
    deps = [
        ":check_macros",
        ":util",
        "@xnnpack//:xnnpack_operators_nhwc_f32",
    ],
)

tfjs_unit_test(
    name = "backend_tests",
    srcs = glob(["*_test.cc"]),
    deps = [
        ":Prelu",
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "binary",
    srcs = ["binary.cc"],
    hdrs = ["binary.h"],
    deps = [
        ":backend",
    ],
)

tfjs_cc_library(
    name = "check_macros",
    srcs = ["check_macros.h"],
    deps = [
        ":util",
    ],
)

tfjs_cc_library(
    name = "clamp_impl",
    srcs = ["clamp_impl.cc"],
    hdrs = ["clamp_impl.h"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "conv2d_impl",
    srcs = ["conv2d_impl.cc"],
    hdrs = ["conv2d_impl.h"],
    deps = [
        ":backend",
        ":prelu_impl",
        ":transpose_impl",
        ":util",
    ],
)

tfjs_cc_library(
    name = "interpolate_bilinear_impl",
    srcs = ["interpolate_bilinear_impl.cc"],
    hdrs = ["interpolate_bilinear_impl.h"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "non_max_suppression_impl",
    srcs = ["non_max_suppression_impl.cc"],
    hdrs = ["non_max_suppression_impl.h"],
    deps = [
        ":backend",
    ],
)

tfjs_cc_library(
    name = "prelu_impl",
    srcs = ["prelu_impl.cc"],
    hdrs = ["prelu_impl.h"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "transpose_impl",
    srcs = ["transpose_impl.cc"],
    hdrs = ["transpose_impl.h"],
    deps = [":util"],
)

tfjs_cc_library(
    name = "util",
    srcs = ["util.cc"],
    hdrs = ["util.h"],
)

tfjs_cc_library(
    name = "unary",
    srcs = ["unary.h"],
    deps = [
        ":backend",
    ],
)

# Kernels

tfjs_cc_library(
    name = "all_kernels",
    deps = [
        ":Abs",
        ":Add",
        ":AddN",
        ":ArgMax",
        ":AvgPool",
        ":BatchMatMul",
        ":ClipByValue",
        ":Conv2D",
        ":CropAndResize",
        ":DepthwiseConv2dNative",
        ":Div",
        ":Exp",
        ":FloorDiv",
        ":FusedBatchNorm",
        ":FusedConv2D",
        ":FusedDepthwiseConv2D",
        ":Gather",
        ":GatherNd",
        ":Greater",
        ":GreaterEqual",
        ":Less",
        ":LessEqual",
        ":Max",
        ":MaxPool",
        ":Maximum",
        ":Min",
        ":Minimum",
        ":Mul",
        ":NonMaxSuppressionV3",
        ":NonMaxSuppressionV5",
        ":PadV2",
        ":Prelu",
        ":Relu",
        ":Relu6",
        ":ResizeBilinear",
        ":ScatterNd",
        ":Sigmoid",
        ":Sub",
        ":Tile",
        ":Transpose",
    ],
)

tfjs_cc_library(
    name = "Abs",
    srcs = ["kernels/Abs.cc"],
    deps = [
        ":backend",
        ":unary",
    ],
)

tfjs_cc_library(
    name = "Add",
    srcs = ["kernels/Add.cc"],
    deps = [
        ":backend",
        ":binary",
        ":util",
    ],
)

tfjs_cc_library(
    name = "AddN",
    srcs = ["kernels/AddN.cc"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "ArgMax",
    srcs = ["kernels/ArgMax.cc"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "AvgPool",
    srcs = ["kernels/AvgPool.cc"],
    hdrs = ["kernels/AvgPool.h"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_unit_test(
    name = "AvgPool_test",
    srcs = ["kernels/AvgPool_test.cc"],
    deps = [
        ":AvgPool",
    ],
)

tfjs_cc_library(
    name = "BatchMatMul",
    srcs = ["kernels/BatchMatMul.cc"],
    hdrs = ["kernels/BatchMatMul.h"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_unit_test(
    name = "BatchMatMul_test",
    srcs = ["kernels/BatchMatMul_test.cc"],
    deps = [
        ":BatchMatMul",
    ],
)

tfjs_cc_library(
    name = "ClipByValue",
    srcs = ["kernels/ClipByValue.cc"],
    hdrs = ["kernels/ClipByValue.h"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_unit_test(
    name = "ClipByValue_test",
    srcs = ["kernels/ClipByValue_test.cc"],
    deps = [
        ":ClipByValue",
    ],
)

tfjs_cc_library(
    name = "Conv2D",
    srcs = ["kernels/Conv2D.cc"],
    hdrs = ["kernels/Conv2D.h"],
    deps = [
        ":conv2d_impl",
    ],
)

tfjs_unit_test(
    name = "Conv2D_test",
    srcs = ["kernels/Conv2D_test.cc"],
    deps = [
        ":Conv2D",
    ],
)

tfjs_cc_library(
    name = "CropAndResize",
    srcs = ["kernels/CropAndResize.cc"],
    deps = [
        ":backend",
        ":interpolate_bilinear_impl",
        ":util",
    ],
)

tfjs_cc_library(
    name = "DepthwiseConv2dNative",
    srcs = ["kernels/DepthwiseConv2dNative.cc"],
    hdrs = ["kernels/DepthwiseConv2dNative.h"],
    deps = [
        ":conv2d_impl",
    ],
)

tfjs_unit_test(
    name = "DepthwiseConv2dNative_test",
    srcs = ["kernels/DepthwiseConv2dNative_test.cc"],
    deps = [
        ":DepthwiseConv2dNative",
    ],
)

tfjs_cc_library(
    name = "Div",
    srcs = ["kernels/Div.cc"],
    deps = [
        ":backend",
        ":binary",
        ":util",
    ],
)

tfjs_cc_library(
    name = "Exp",
    srcs = ["kernels/Exp.cc"],
    deps = [
        ":backend",
        ":unary",
    ],
)

tfjs_cc_library(
    name = "FloorDiv",
    srcs = ["kernels/FloorDiv.cc"],
    deps = [
        ":backend",
        ":binary",
        ":util",
    ],
)

tfjs_cc_library(
    name = "FusedBatchNorm",
    srcs = ["kernels/FusedBatchNorm.cc"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "FusedConv2D",
    srcs = ["kernels/FusedConv2D.cc"],
    hdrs = ["kernels/FusedConv2D.h"],
    deps = [
        ":conv2d_impl",
    ],
)

tfjs_unit_test(
    name = "FusedConv2D_test",
    srcs = ["kernels/FusedConv2D_test.cc"],
    deps = [
        ":FusedConv2D",
    ],
)

tfjs_cc_library(
    name = "FusedDepthwiseConv2D",
    srcs = ["kernels/FusedDepthwiseConv2D.cc"],
    hdrs = ["kernels/FusedDepthwiseConv2D.h"],
    deps = [
        ":conv2d_impl",
    ],
)

tfjs_unit_test(
    name = "FusedDepthwiseConv2D_test",
    srcs = ["kernels/FusedDepthwiseConv2D_test.cc"],
    deps = [
        ":FusedDepthwiseConv2D",
    ],
)

tfjs_cc_library(
    name = "Gather",
    srcs = ["kernels/Gather.cc"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "GatherNd",
    srcs = ["kernels/GatherNd.cc"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "Greater",
    srcs = ["kernels/Greater.cc"],
    deps = [
        ":backend",
        ":binary",
        ":util",
    ],
)

tfjs_cc_library(
    name = "GreaterEqual",
    srcs = ["kernels/GreaterEqual.cc"],
    deps = [
        ":backend",
        ":binary",
        ":util",
    ],
)

tfjs_cc_library(
    name = "Less",
    srcs = ["kernels/Less.cc"],
    deps = [
        ":backend",
        ":binary",
        ":util",
    ],
)

tfjs_cc_library(
    name = "LessEqual",
    srcs = ["kernels/LessEqual.cc"],
    deps = [
        ":backend",
        ":binary",
        ":util",
    ],
)

tfjs_cc_library(
    name = "LogicalAnd",
    srcs = ["kernels/LogicalAnd.cc"],
    deps = [
        ":backend",
        ":binary",
        ":util",
    ],
)

tfjs_cc_library(
    name = "Log",
    srcs = ["kernels/Log.cc"],
    deps = [
        ":backend",
        ":unary",
    ],
)

tfjs_cc_library(
    name = "Max",
    srcs = ["kernels/Max.cc"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "Maximum",
    srcs = ["kernels/Maximum.cc"],
    deps = [
        ":backend",
        ":binary",
        ":util",
    ],
)

tfjs_cc_library(
    name = "MaxPool",
    srcs = ["kernels/MaxPool.cc"],
    hdrs = ["kernels/MaxPool.h"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_unit_test(
    name = "MaxPool_test",
    srcs = ["kernels/MaxPool_test.cc"],
    deps = [
        ":MaxPool",
    ],
)

tfjs_cc_library(
    name = "Min",
    srcs = ["kernels/Min.cc"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "Minimum",
    srcs = ["kernels/Minimum.cc"],
    deps = [
        ":backend",
        ":binary",
        ":util",
    ],
)

tfjs_cc_library(
    name = "Mul",
    srcs = ["kernels/Mul.cc"],
    deps = [
        ":backend",
        ":binary",
        ":util",
    ],
)

tfjs_cc_library(
    name = "NonMaxSuppressionV3",
    srcs = ["kernels/NonMaxSuppressionV3.cc"],
    deps = [
        ":backend",
        ":non_max_suppression_impl",
        ":util",
    ],
)

tfjs_cc_library(
    name = "NonMaxSuppressionV5",
    srcs = ["kernels/NonMaxSuppressionV5.cc"],
    deps = [
        ":backend",
        ":non_max_suppression_impl",
        ":util",
    ],
)

tfjs_cc_library(
    name = "PadV2",
    srcs = ["kernels/PadV2.cc"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "Prelu",
    srcs = ["kernels/Prelu.cc"],
    hdrs = ["kernels/Prelu.h"],
    deps = [
        ":backend",
        ":prelu_impl",
        ":util",
    ],
)

tfjs_unit_test(
    name = "Prelu_test",
    srcs = ["kernels/Prelu_test.cc"],
    deps = [
        ":Prelu",
    ],
)

tfjs_cc_library(
    name = "Relu",
    srcs = ["kernels/Relu.cc"],
    deps = [
        ":backend",
        ":clamp_impl",
        ":unary",
    ],
)

tfjs_cc_library(
    name = "Relu6",
    srcs = ["kernels/Relu6.cc"],
    deps = [
        ":backend",
        ":clamp_impl",
        ":unary",
    ],
)

tfjs_cc_library(
    name = "ResizeBilinear",
    srcs = ["kernels/ResizeBilinear.cc"],
    hdrs = ["kernels/ResizeBilinear.h"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_unit_test(
    name = "ResizeBilinear_test",
    srcs = ["kernels/ResizeBilinear_test.cc"],
    deps = [
        ":ResizeBilinear",
    ],
)

tfjs_cc_library(
    name = "ScatterNd",
    srcs = ["kernels/ScatterNd.cc"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "Sigmoid",
    srcs = ["kernels/Sigmoid.cc"],
    hdrs = ["kernels/Sigmoid.h"],
    deps = [
        ":backend",
        ":unary",
    ],
)

tfjs_unit_test(
    name = "Sigmoid_test",
    srcs = ["kernels/Sigmoid_test.cc"],
    deps = [
        ":Sigmoid",
    ],
)

tfjs_cc_library(
    name = "Square",
    srcs = ["kernels/Square.cc"],
    deps = [
        ":backend",
        ":unary",
    ],
)

tfjs_cc_library(
    name = "Sub",
    srcs = ["kernels/Sub.cc"],
    deps = [
        ":backend",
        ":binary",
        ":util",
    ],
)

tfjs_cc_library(
    name = "Tile",
    srcs = ["kernels/Tile.cc"],
    deps = [
        ":backend",
        ":util",
    ],
)

tfjs_cc_library(
    name = "Transpose",
    srcs = ["kernels/Transpose.cc"],
    deps = [
        ":backend",
        ":transpose_impl",
        ":util",
    ],
)
