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
  - [SAL Files](#sal-files)
    - [Analysis](#analysis)
    - [Handling Framing Errors](#handling-framing-errors)

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

## SAL Files

A SAL (_.sal_) file is a capture file in Saleae Logic Analyzer. A .sal capture itself is a zip file containing:

- ```meta.json``` - _a json file describing the capture_
- ```digital-#.bin``` - _raw digital data_
- ```analog-#.bin``` - _raw analog data_

### Analysis

... can be done using Saleae's Logic Analyzer [Logic 2](https://www.saleae.com/de/pages/downloads).

To start Logic 2:

```bash
chmod +x ./Logic-x.x.x-master.AppImage
./Logic-x.x.x-master.AppImage
```

1. Inside the analyzer, click "Open a capture" and select the target file
2. Open "Analyzer" tab on the right and click on "Async Serial"
3. A dialogue opens and configuration needs to be done (_BitRate_)
4. Save
5. Convert values into ASCII to read data

> [!NOTE]
> Async Serial _or_ Asynchronous serial communication is a form of serial communication in which the communicating endpoints' interfaces are not continuously synchronized by a common clock signal.

### Handling Framing Errors

A framing error happens when a receiver in a serial communication system fails to correctly identify the boundaries of a byte or character. If the bits are being read too fast or too slow, the bits will give different values. To fix this, find the shortest interval.

> [!TIP]
> Think of it like this: You're trying to read words from someone who is speaking, but their pauses between words are messed up:<br>
> ```Th isis af rame in ge rro r.```<br>
> _Logic 2 will warn you if there are framing errors present._

To calculate the actual bit rate:

```
Bit rate (bit/s) = 1 second / (interval(microseconds) x 10^(-6)) seconds
# ignore decimals
```