
class EnveloppeConvexe {
    static algo = { demiPlan: 0, jarvis: 1, graham: 2 };
    constructor(lesPoints, a) {
        this.algo = a ?? EnveloppeConvexe.algo.jarvis;
        this.points = lesPoints;
        this.envConv = new Array();
        this.runAlgo(this.algo);
    }

    getEnvConv() {
         return this.envConv;
    }

    updateEnvConvFromIndices(indices) {
       this.envConv = new Array();
       for (let i = 0; i < indices.length; i++) {
           this.envConv.push(this.points[indices[i]]);
        }      
    }

    runAlgo(idAlgo) {
        this.algo = idAlgo;
        switch (this.algo) {
            case EnveloppeConvexe.algo.demiPlan:
                this.envconv = this.algoDemiPlan(this.points);
                break;
            case EnveloppeConvexe.algo.jarvis:
                this.envconv = this.algoJarvis(this.points);
                break;
            case EnveloppeConvexe.algo.graham:
                this.envconv = this.algoGraham(this.points);
                break;
            default:
                console.log("algo non défini => algo jarvis utilisé");
                this.envconv = this.algoJarvis(this.points);
                break;
        }
    }

    findNextIdx(currentIdx, points) {
     //todo: fonction utile pour l'algo de Jarvis
        let idNext = (currentIdx+1)%(points.length);

        for(let i = 0; i < points.length; i++){
            if(Coord2D.tour(points[currentIdx], points[i], points[idNext]) == 1){
                idNext = i;
            }
        }

        return idNext;
    }

    findFirstIdx(V, i, j) {
        for (let k = 0; k < V.length; k++) {
            if (V[k] != V[i] && V[k] != V[j]) {
                return k;
            }
        }
    }

    algoDemiPlan(points) {
    //todo: implementation de cet algo

        let result = [];

        let n = points.length;
        let current, previous, i, j, k, f;
        let mc;

        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                if (i < j) {
                    mc = true;
                    f = this.findFirstIdx(points, i, j);
                    previous = Coord2D.tour(points[i], points[j], points[f]);
                    k = f + 1;

                    do {
                        if (k != i && k != j) {
                            current = Coord2D.tour(points[i], points[j], points[k]);

                            if (current == 0) {
                                throw new Error("Alignement");
                            }
                            else if (current != previous) {
                                mc = false;
                            }
                        }
                        previous = current;
                        k++;
                    } while(k < n && mc == true)

                    if (k == n && previous == current) {
                        if (current > 0) {
                            result.push(i, j);
                        }
                        else if (current < 0) {
                            result.push(j, i);
                        }
                        else if (current == 0) {
                            throw new Error("Alignement");
                        }
                    }
                }
            }
        }
        return result;
    }

    algoJarvis(points) {
    //todo: implementation de cet algo
    
        let min = Coord2D.findMinIdx(points);
        let result = [points[min]];
        let current;
        let previous = min;

      do {
            current = this.findNextIdx(previous, points);

            result.push(points[current]);
            previous = current;
        }while(current != min)

        return result;

    }

    algoGraham() {
    //todo: implementation de cet algo
    }

}
