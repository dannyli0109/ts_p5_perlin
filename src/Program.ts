import P5 from "p5"

function randomRangeF(min, max)
{
    return Math.random() * (max - min) + min;
}

const sketch = (p5: P5) => {
	// DEMO: Prepare an array of MyCircle instances
	// const myCircles: MyCircle[] = [];

	// The sketch setup method 
    let map = [];
    let r = 50;
    let w = 50;
    let scale;
    let frequencySlider: P5.Element;
    let scaleSlider: P5.Element;


    let generate = () => {
        let xRandom = randomRangeF(0, 100);
        let yRandom = randomRangeF(0, 100);
        map = [];
        let frequency = frequencySlider.value() as number;
        scale = scaleSlider.value() as number;
        
        for (let i = 0; i < w; i++){
            map.push([]);
            for (let j = 0; j < w; j++)
            {
                let xFloat = i;
                let yFloat = j;
                let xSizeFloat = w;
                let ySizeFloat = w;
                let height = p5.noise(xFloat / xSizeFloat * frequency + xRandom, yFloat / ySizeFloat * frequency + yRandom) * scale;
                map[i].push(height);
            }
        }
    }

	p5.setup = () => {
		p5.createCanvas(1000, 1000, p5.WEBGL);
        frequencySlider = p5.createSlider(0, 10, 3, 0.1);
        scaleSlider = p5.createSlider(0, 10000, 1000, 100);
        p5.createButton("Generate").mousePressed(generate);
        generate();
	};


    
	// The sketch draw method
	p5.draw = () => {
        p5.background(0);
        // p5.translate(50 * 50 / 2, 0, 50 * 50 / 2);
        p5.ambientLight(60, 60, 60);
        // console.log(s1.value)
        p5.directionalLight(255, 255, 255, 0, 1, 0);
        p5.orbitControl(2, 2, 2);
       
        p5.push();
        p5.translate(-r * w / 2, 0, -r * w / 2);
        for (let i = 0; i < w; i++){
            for (let j = 0; j < w; j++)
            {
                p5.noStroke();
                p5.push();
                p5.translate(i * r, -map[i][j] / 2, j * r);
                p5.ambientMaterial(250);
                if (map[i][j] > scale * 0.7)
                {
                    p5.fill(255, 255, 255);
                }
                else if (map[i][j] > scale * 0.5)
                {
                    p5.fill(212, 175, 55);
                }
                else if (map[i][j] > scale * 0.3)
                {
                    p5.fill(37,89,31);
                }
                else
                {
                    p5.fill(32, 62, 154);
                }
                p5.box(r, map[i][j], r);
                p5.pop();
            }
        }
        p5.pop();
	};
};

// new P5(sketch);

export class Program
{
    public init()
    {
        new P5(sketch);
    }
}