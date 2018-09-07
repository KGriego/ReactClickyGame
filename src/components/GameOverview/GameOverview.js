import React, { Component } from "react";
import ImageClicker from "../ImageClicker";
import Image from "../../utils/imageClass";
import { Col, Row, Container } from "../Grid";

import EyeMonster from "../../assets/images/EyeMonster.jpg";
import FlyingDragon from "../../assets/images/FlyingDragon.jpg";
import FlyingLizard from "../../assets/images/FlyingLizard.jpg";
import GlowingStone from "../../assets/images/GlowingStone.jpg";
import IGiveUp from "../../assets/images/IGiveUp.jpg";
import MonsterOnCrane from "../../assets/images/MonsterOnCrane.jpg";
import MonsterOnHill from "../../assets/images/MonsterOnHill.jpg";
import MonsterTakingChildren from "../../assets/images/MonsterTakingChildren.jpg";

class GameOverview extends Component {
    state = {
        images: [
            new Image(EyeMonster,"Eye Monster"),
            new Image(FlyingDragon,"Flying Dragon"),
            new Image(FlyingLizard,"Flying Lizard"),
            new Image(GlowingStone,"Glowing Stone"),
            new Image(IGiveUp,"I Don't know"),
            new Image(MonsterOnCrane,"Monster On A Crane"),
            new Image(MonsterOnHill,"Monster On A Hill"),
            new Image(MonsterTakingChildren,"Monster Taking Children"),
        ],
        currentScore: 0,
        topScore: 0,
        align:{textAlign: "right"}
    }

    handleClick = index => {
        if (this.state.images[index].clicked) {
            const top = this.state.topScore;
            this.setState({ currentScore: 0, topScore: top });
            this.resetClicked();
        } else {
            const current = this.state.currentScore + 1;

            if (current > this.state.topScore) {
                this.setState({ topScore: current });
            }
            this.setState({
                currentScore: current,
                images: this.state.images.map((e, i) => {
                    if (i === index) {
                        e.clicked = true;
                    }
                    return e;
                })
            });
        }
        this.randomizePictures();
    }

    resetClicked = () => {
        this.setState({
            images: this.state.images.map((e) => {
                e.clicked = false;
                return e;
            })
        })
    }

    randomizePictures = () => {
        const array = this.state.images;
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        this.setState({ images: array });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="sm-12">
                        <h1 className="text-center">Memory Game</h1>
                    </Col>
                </Row>
                <Row>
                    <Col size="sm-12">
                        <p className="text-center">Try to click them all without repeating!</p>
                    </Col>
                </Row>
                <Row>
                    <Col size="sm-6">
                        <h4 >Your Current Score: {this.state.currentScore}</h4>
                    </Col>
                    <Col size="sm-6" style={this.state.align}>
                        <h4 className="text-left">Your Top Score: {this.state.topScore}</h4>
                    </Col>
                </Row>
                <Row>
                    {this.state.images.map((e, i) => (
                        <Col size="md-4 sm-6" className="text-centered"key ={i}>
                            <ImageClicker {...e} key={i} onClick={() => this.handleClick(i)} />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

export default GameOverview;