class Test {
    static defaultAction = "draw";
    cp; // control panel
    a;  // action
    d;  // displayer
    centre = new Coord2D(0, 0);
    referencePoint;
    states = { center: 2, comp: 3, smaller: -1, bigger: 1, equal: 0 };


    constructor(_action) {
        this.a = _action;
    }

    //priori simplicité (version draft: les clés des options ui sont utilisées telles quelles dans un if else infernal, beurk mais rapide, à revoir ?)
    //ui keys = tour, comp, tri, algo_dp, algo_jarvis, algo_graham
    run() {
        this.d.init();
        this.d.setModelSpace(...this.getModelSpace());
        this.d.drawPoints(this.getPoints(), false);

        //todo

        let points = this.getPoints();
        //Ex1
        /*this.d.myDrawTour(Coord2D.tour(points[0], points[1], points[2]), points[0], points[1], points[2], points, true);
        this.d.myDrawTour(Coord2D.tour(points[0], points[5], points[4]), points[0], points[5], points[4], points, true);*/

        //Ex3
        console.clear();
        const ec = new EnveloppeConvexe(points, 1);

        //Test findMin
        /*let min = Coord2D.findMinIdx(points);
        console.log(min);*/

        //Test findNext
        /*let next1 = ec.findNextIdx(points[0], points);
        this.d.mDrawLine(points[0], next1);

        let next2 = ec.findNextIdx(points[1], points);
        this.d.mDrawLine(points[1], next2);

        let next3 = ec.findNextIdx(points[2], points);
        this.d.mDrawLine(points[2], next3);

        let next4 = ec.findNextIdx(points[3], points);
        this.d.mDrawLine(points[3], next4);

        let next5 = ec.findNextIdx(points[5], points);
        this.d.mDrawLine(points[5], next5);*/

        //Test algo Jarvis
        /*let resultat = ec.algoJarvis(points);

        for (let i = 0; i < resultat.length-1; i++) {
            this.d.mDrawLine(resultat[i], resultat[i+1]);
        }*/

        //Ex2
        //Test algo Demi Plan
        let resultat = ec.algoDemiPlan(points);

        for (let i = 0; i < resultat.length-1; i++) {
            this.d.mDrawLine(points[resultat[i]], points[resultat[i+1]]);
        }

    }

    setUI(_controlPanel, _displayer) {
        this.cp = _controlPanel;
        this.d = _displayer;
    }

    changeAction(_newA) {
        this.a = _newA;
        this.run();
    }
    
    refresh() {
        this.run();
    }

    // made to fit the signature of setModelSpace@Displayer(minX, minY, maxX, maxY)
    getModelSpace() {
        return [
            this.cp.getDataSet().minX,
            this.cp.getDataSet().minY,
            this.cp.getDataSet().maxX,
            this.cp.getDataSet().maxY
        ]
    }

    getPoints() {
        return this.cp.getDataSet().getPoints();
    }

    renewData() {
        this.cp.renewData();
        this.refresh();
    }
}