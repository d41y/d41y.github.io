- [Hardware Fundamentals](#hardware-fundamentals)
  - [Logic Gates](#logic-gates)
    - [Gate Types](#gate-types)
      - [AND Gate](#and-gate)
      - [NOT Gate](#not-gate)
      - [OR Gate](#or-gate)
      - [NAND Gate](#nand-gate)
      - [NOR Gate](#nor-gate)
      - [XOR Gate](#xor-gate)
      - [XNOR Gate](#xnor-gate)

---

# Hardware Fundamentals

## Logic Gates

... are an electronic circuit that are designed by using electrical components like diodes, transistors, resistors, and more. It is used to perform logical operations based on the inputs provided to it and gives a logical output that can either be high (_1_) or low (_0_). The operation of logic gates is based on boolean algebra or mathematics.

They are constructed from so-called transistors. Transistors are electronic components that are essentially switches. Unlike manual switches, which are operated by hand, electronic switches can be controlled by an electrical input signal.

### Gate Types

#### AND Gate

... takes two (_or more_) inputs and gives out a 1 if all the inputs are 1. Otherwise, it gives out a 0.

![Logic Gates 1](../../images/logic_gates1.png)

| Input A | Input B | Output Q |
| ------- | ------- | -------- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

![Logic Gates 11](../../images/logic_gates11.png)

#### NOT Gate

... takes one bit as input and gives back an output which is NOT the input.

![Logic Gates 2](../../images/logic_gates2.png)

| Input A | Output Q |
| ------- | -------- |
| 0 | 1 |
| 1 | 0 |

![Logic Gates 9](../../images/logic_gates9.png)

#### OR Gate

... takes two (_or more_) inputs and gives out a 1 if any of the inputs are 1.

![Logic Gates 3](../../images/logic_gates3.png)

| Input A | Input B | Output Q |
| ------- | ------- | -------- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

![Logic Gates 10](../../images/logic_gates10.png)

#### NAND Gate

... operates in the oppposite way of the AND gate.

![Logic Gates 4](../../images/logic_gates4.png)


| Input A | Input B | Output Q |
| ------- | ------- | -------- |
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

![Logic Gates 8](../../images/logic_gates8.png)

#### NOR Gate

... operates in the opposite way of the OR gate.

![Logic Gates 5](../../images/logic_gates5.png)

| Input A | Input B | Output Q |
| ------- | ------- | -------- |
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

#### XOR Gate

... outputs 1 if one of its two inputs is 1 - but not both.

![Logic Gates 6](../../images/logic_gates6.png)

| Input A | Input B | Output Q |
| ------- | ------- | -------- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

#### XNOR Gate

... works like an XOR gate with an inverter on the output.

![Logic Gates 7](../../images/logic_gates7.png)

| Input A | Input B | Output Q |
| ------- | ------- | -------- |
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |