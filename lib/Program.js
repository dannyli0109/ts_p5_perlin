"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Program = void 0;
var p5_1 = __importDefault(require("p5"));
function randomRangeF(min, max) {
    return Math.random() * (max - min) + min;
}
var sketch = function (p5) {
    var map = [];
    var r = 50;
    var w = 50;
    var scale;
    var frequencySlider;
    var scaleSlider;
    var generate = function () {
        var xRandom = randomRangeF(0, 100);
        var yRandom = randomRangeF(0, 100);
        map = [];
        var frequency = frequencySlider.value();
        scale = scaleSlider.value();
        for (var i = 0; i < w; i++) {
            map.push([]);
            for (var j = 0; j < w; j++) {
                var xFloat = i;
                var yFloat = j;
                var xSizeFloat = w;
                var ySizeFloat = w;
                var height = p5.noise(xFloat / xSizeFloat * frequency + xRandom, yFloat / ySizeFloat * frequency + yRandom) * scale;
                map[i].push(height);
            }
        }
    };
    p5.setup = function () {
        p5.createCanvas(1000, 1000, p5.WEBGL);
        frequencySlider = p5.createSlider(0, 10, 3, 0.1);
        scaleSlider = p5.createSlider(0, 10000, 1000, 100);
        p5.createButton("Generate").mousePressed(generate);
        generate();
    };
    p5.draw = function () {
        p5.background(0);
        p5.ambientLight(60, 60, 60);
        p5.directionalLight(255, 255, 255, 0, 1, 0);
        p5.orbitControl(2, 2, 2);
        p5.push();
        p5.translate(-r * w / 2, 0, -r * w / 2);
        for (var i = 0; i < w; i++) {
            for (var j = 0; j < w; j++) {
                p5.noStroke();
                p5.push();
                p5.translate(i * r, -map[i][j] / 2, j * r);
                p5.ambientMaterial(250);
                if (map[i][j] > scale * 0.7) {
                    p5.fill(255, 255, 255);
                }
                else if (map[i][j] > scale * 0.5) {
                    p5.fill(212, 175, 55);
                }
                else if (map[i][j] > scale * 0.3) {
                    p5.fill(37, 89, 31);
                }
                else {
                    p5.fill(32, 62, 154);
                }
                p5.box(r, map[i][j], r);
                p5.pop();
            }
        }
        p5.pop();
    };
};
var Program = (function () {
    function Program() {
    }
    Program.prototype.init = function () {
        new p5_1["default"](sketch);
    };
    return Program;
}());
exports.Program = Program;
