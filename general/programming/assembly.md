- [Assembly](#assembly)
  - [Architecture](#architecture)
    - [Assembly Language](#assembly-language)
    - [High-Level vs. Low-Level](#high-level-vs-low-level)
    - [Compilation Stages](#compilation-stages)
  - [Computer Architecture](#computer-architecture)
    - [Memory](#memory)
      - [Cache](#cache)
      - [RAM](#ram)
    - [IO/Storage](#iostorage)
    - [Speed](#speed)
  - [CPU Architecture](#cpu-architecture)
    - [Clock Speed \& Clock Cycle](#clock-speed--clock-cycle)
    - [Instruction Cycle](#instruction-cycle)
    - [Processor Specific](#processor-specific)
  - [Instruction Set Architecture (ISA)](#instruction-set-architecture-isa)
    - [CISC](#cisc)
    - [RISC](#risc)
    - [CISC vs RISC](#cisc-vs-risc)
  - [Registers, Addresses, and Data Types](#registers-addresses-and-data-types)
    - [Registers](#registers)
    - [Sub-Registers](#sub-registers)
    - [Memory Addresses](#memory-addresses)
    - [Address Endianness](#address-endianness)
    - [Data Types](#data-types)

---

# Assembly

## Architecture

### Assembly Language

Most of your interaction with your personal computers and smartphones is done through the OS and other applications. These applications are usually developed using high-level languages. You also know that each of these devices has a core processor that runs all of the necessary processes to execute systems and applications, along with Random Access Memory, Video Memory, and other similar components.

However, these physical components cannot interpret or understand high-level languages, as they can essentially only process 1s and 0s. This is where Assembly language comes in, as a low-level language that can write direct instructions the processor can understand. Since the processor can only process binary data, it would be challenging for humans to interact with processors without referring to manuals to know which hex code runs which instruction.

This is why low-level assembly languages were built. By using Assembly, developers can write human-readbale machine instructions, which are then assembled into their machine code equivalent, so that the processor can directly run them. This is why some refer to Assembly language as symbolic machine code.

Machine code is often represented as Shellcode, a hex representation of machine code bytes. Shellcode can be translated back to its Assembly counterpart and can also be loaded directly into memory as binary instructions to be executed.

### High-Level vs. Low-Level

As there are different processor designs, each processor understands a different set of machine instructions and a different Assembly language. In the past, applications had to be written in assembly for each processor, so it was not easy to develop an application for multiple processors. In the early 1970's, high-level languages were developed to make it possible to write a single easy to understand code that can work on any processor without rewriting it for each processor. To be more specific, this was made possible by creating compilers for each language.

When high-level code is compiled, it is translated into assembly instructions for the processor it is being compiled for, which is then assembled into machine code to run on the processor. This is why compilers are built for various languages and various processors to convert the high-level code into assembly code and then machine code that matches the running processor.

Later on, interpreted languages were developed, which are usually not compiled but are interpreted during run time. These types of languages utilize pre-built libraries to run their instructions. These libraries are typically written and compiled in other high-level languages like C or C++. So when you issue a command in an interpreted language, it would use the compiled library to run that command, which uses its assembly code/machine code to perform all the instructions necessary to run this command on the processor.

### Compilation Stages

![assembly 1](../../images/assembly_1.png)

## Computer Architecture

Today most modern computers are built on the Von Neumann Architecture, which was developed back in 1945 by Von Neumann to enable the creation of "General Purpose Computers".

This architecture executes machine code to perform specific algorithms. It mainly consists of the following elements:

- Central Processing Unit (_CPU_)
- Memory Unit
- Input/Output Devices
  - Mass Storage Unit
  - Keyboard
  - Display

The CPU itself consists of:

- Control Unit (_CU_)
- Arithmetic/Logic Unit (_ALU_)
- Registers

Assembly languages mainly work with the CPU and memory.

### Memory

A computer's memory is where the temporary data and instructions of currently running programs are located. A computer's memory ism also known as Primary Memory. It is the primary location the CPU uses to retrieve and process data. It does so very frequently, so the memory must be extremely fast in storing and retrieving data and instructions.

Two main types of memory:

 - Cache
 - Random Access Memory (_RAM_)

#### Cache

... memory is usually located within the CPU itself and hence is extremely fast compared to RAM, as it runs at the same clock speed as the CPU. However, it is very limited in size and very sophisticated, and expensive to manufacture due to it being so close to the CPU.

Since RAM clock speed is usually much slower than the CPU cores, in addition to it being far from the CPU, if a CPU hat to wait for the RAM to retrieve each instruction, it would effectivley be running at much lower clock speeds. This is the main benefit of cache memory. It enables the CPU to access the upcoming instructions and data quicker than retrieving them from RAM.

There are usually three levels of cache memory, depending on their closeness to the CPU core:

| Level | Description |
| ----- | ----------- |
| Level 1 Cache | usually in kilobytes, the fastest memory available, located in each CPU core |
| Level 2 Cache | usually in megabytes, extremely fast, shared between all CPU cores |
| Level 3 Cache | usually in megabytes, faster than RAM but slower than L1/L2 |


#### RAM

... is much larger than cache memory, coming in sizes ranging from gigabytes up to terabytes. RAM is also located far away from the CPU cores and is much slower than cache memory. Accessing data from RAM addresses takes many more instructions.

For example, retrieving an instruction from the registers takes only one clock cycle, and retrieving it from the L1 cache takes a few cycles, while retrieving it from RAM takes around 200 cycles. When this is done billions of times in a second, it makes a massive difference in the overall execution speed.

In the past, with 32-bit addresses, memory addresses were limited from ```0x00000000``` to ```0xffffffff```. This meant the maximum possible RAM size was 2^32 bytes, which is only 4 gigabytes, at which point you run out of unique addresses. With 64-bit addresses, the range is now up to ```0xffffffffffffffff```, with a theoretical maximum RAM size of 2^64, which is around 18.5 exabytes, so you shouldn't be running out of memory addresses anytime soon.

When a program is run, all of its data and instructions are moved from the storage unit to the RAM to be accessed when needed by the CPU. This happens because accessing them from the storage unit is much slower and will increase data processing time. When a program is closed, its data is removed or made availabe to re-use from the RAM.

The RAM is split into four main segments:

![assembly 1](../../images/assembly_2.png)

| Segment | Description |
| ------- | ----------- |
| Stack | has a last-in-first-out design and is fixed in size; data in it can only be accessed in a specific order by pushing and popping data |
| Heap | has a hierachical design and is therefore much larger and more versatile in storing data, as data can be stored and retrieved in any order; however, this makes the heap slower than the stack |
| Data | has two parts: 1) data, which is used to hold variables and 2) ```.bss```, which is used to hold unassigend variables |
| Text | main assembly instructions are loaded into this segment to be fetched and executed by the CPU |

Although this segmentation applies to the entire RAM, each application is allocated its Virtual Memory when it is run. This means that each application would have its own stack, heap, data, text segments.

### IO/Storage

... like the keyboard, the screen, or the long-term storage unit, also known as Secondary Memory. The processor can access and control IO devices using Bus Interfaces, which act as 'highways' to transfer data and addresses, using electrical charges for binary data.

Each bus has capacity of bits it can carry simultaneously. This usually is a multiple of 4-bits, ranging up to 128-bits. Bus interfaces are also usually used to access memory and other components outside the CPU itself.

Unlike primary memory that is volatile and stores temporary data and instructions as the programs are running, the storage unit stores permanent data, like the OS files or entire applications and their data.

The storage unit is the slowest to access. First, because they are the farthest away from the CPU, accessing them through bus interfaces like SATA or USB takes much longer to store and retrieve the data. They are also slower in their design to allow more data storage. As long as there is more data to go through, they will be slower.

SSDs utilize a similar design to RAMs, using non-volatile circuitry that retains data even without electricity. This made storage units much faster in storing and retrieving data. Still, since they are far away from the CPU and connected through special interfaces they are the slowest unit to access.

### Speed

| Component | Speed | Size |
| --------- | ----- | ---- |
| Registers | fastest | Bytes |
| L1 Cache | fastest, other than Registers | Kilobytes |
| L2 Caches | very fast | Megabytes |
| L3 Caches | fast, but slower than the above | Megabytes |
| RAM | much slower than all of the above | Gigabytes-Terabytes |
| Storage | slowest | Terabytes and more |

## CPU Architecture

The CPU is the main processing unit wihtin a computer. The CPU contains both the Control Unit, which is in charge of moving and controlling data, and the Arithmetic/Logic Unit, which is in charge of performing various arithmetics and logical calculations as requested by a program through the assembly instructions.

The manner in which and how efficiently a CPU processes its instructions depends on its Instruction Set Architecture (_ISA_). There are multiple ISAs in the industry, each having its way of processing data. RISC architecture is based on processing more simple instructions, which takes more cycles, but each cycle is shorter and takes less power. The CISC architecture is based on fewer, more complex instructions, which can finish the requested instructions in fewer cycles, but each instruction takes more time and power to be processed.

### Clock Speed & Clock Cycle

Each CPU has a clock speed that indicates its overall speed. Every tick of the clock runs a clock cycle that processes a basic instruction, such as fetching an address or storing an address. Specifically, this is done by the CU or ALU.

The frequency in which the cycles occur is counted is cycles per second (_Hertz_). If a CPU has a speed of 3.0 GHz, it can run 3 billion cycles every second (_per core_).

![assembly 3](../../images/assembly_3.png)

Modern processors have a multi-core design, allowing them to have multiple cycles at the same time.

### Instruction Cycle

... is the cycle it takes the CPU to process a single machine instruction.

![assembly 4](../../images/assembly_4.png)

An instruction cycle consists of four stages: **fetch**, **decode**, **execute**, and **store**:

| Instruction | Description |
| ----------- | ----------- |
| 1. Fetch | takes the next instruction's address from the Instruction Address Register (_IRA_), which tells it where the next instruction is located |
| 2. Decode | takes the instruction from the IAR, and decodes it from binary to see what is required to be executed |
| 3. Execute | fetch instruction operands from register/memory, and process the instruction in the ALU or CU |
| 4. Store | Store the new value in the destination operand |

Each Instruction Cycle takes multiple clock cycles to finish, depending on the CPU architecture and the complexity of the instruction. Once a single instruction cycle ends, the CU increments to the next instruction and runs the same cycle on it, and so on.

![assembly 5](../../images/assembly_5.png)

For example, if you were to execute the assembly instruction ```add rax, 1```, it would run through an instruction cycle:

1. Fetch the instruction from the ```rip``` register, ```48 83 C0 01``` (_in binary_).
2. Decode '```48 83 C0 01```' to know it needs to perform an ```add``` of ```1``` to the value at ```rax```.
3. Get the current value at ```rax``` (_by ```CU```_), add ```1``` to it (_by the ```ALU```_).
4. Store the new value back to ```rax```.

In the past, processors used to process instructions sequentially, so they had to wait for one instruction to finish to start the next. On the other hand, modern processors can process multiple instructions in parallel by having multiple instruction/clock cycles running at the same time. This is made possible by having a multi-thread and multi-core design.

![assembly 6](../../images/assembly_6.png)

### Processor Specific

Each processor understands a different set of instructions. For example, while an Intel processor based on the 64-bit x86 architecture may interpret the machine code ```4883C001``` as ```add rax, 1```, ARM processor translates the same machine code as the ```biceq r8, r0, r8, asr #6``` instruction.

This is because each processor type has a different low-level assembly language architecture known as Instruction Set Architectures (_ISA_). For example, the add instruction seen above, ```add rax, 1```, is for Intel x86 64-bit processors. The same instruction written for the ARM processor assembly language is represented as ```add r1, r1, 1```.

It is important to understand that each processor has its own set of instructions and corresponding machine code.

Furthermore, a single Instruction Set Architecture may have several syntax interpretations for the same assembly code. For example, the above ```add``` instruction is based on the x86 architecture, which is supported by multiple processors like Intel, AMD, and legacy AT&T processors. The instruction is written as ```add rax, 1``` with intel syntax, and written as ```addb $0x1, %rax``` with AT&T syntax.

Even though you can tell that both instructions are similar and do the same thing, their syntax is different, and the location of the source and destination operands are swapped as well. Still, both codes assemble the same machine code and perform the same instruction.

If you want to know whether your Linux system supports ```x86_64``` architecture, you can use the ```lscpu``` command:

```bash
d41y@htb[/htb]$ lscpu

Architecture:                    x86_64
CPU op-mode(s):                  32-bit, 64-bit
Byte Order:                      Little Endian

<SNIP>
```

## Instruction Set Architecture (ISA)

... specifies the syntax and semantics of the assembly language on each architecture. It is not just a different syntax but is built in the core of a processor, as it affects the way and order instructions are executed and their level of complexity. ISA mainly consists of the following components:

- Instructions
- Registers
- Memory Addresses
- Data Types

| Component | Example | Description |
| --------- | ------- | ----------- |
| Instructions | ```add rax, 1```, ```mov rsp, rax```, ```push rax``` | the instruction to be processed in the ```opcode operand_list``` format; there are usually 1, 2, or 3 comma-separated operands |
| Registers | ```rax```, ```rsp```, ```rip``` | used to store operands, addresses, or instructions temporarily |
| Memory Addresses | ```0xffffffffaa8a25ff```, ```0x44d0```, ```$rax``` | the address in which data or instructions are atored; may point to memory or registers |
| Data Types | _byte, word, double word_ | the type of data stored |

There are two main Instruction Set Architectures:

1. Complex Instruction Set Computer (_CISC_)
   - used in Intel and AMD processors in most computers and servers
2. Reduced Instruction Set Computer (_RISC_)
   - used in ARM and Apple processors, in most smartphones, and some laptops

### CISC

... architecture was one of the earliest ISA's ever developed. It favors more complex instructions to be run at a time to reduce the overall number of instructions. This is done to rely as much as possible on the CPU by combining minor instructions into more complex ones.

Suppose you were to add two registers with the ```add rax, rbx``` instruction. In that case, a CISC processor can do this in a single 'Fetch-Decode-Execute-Store' cycle, without having to split into multiple instructions to fetch ```rax```, then fetch ```rbx```, then add them, and then store them in ```rax```, each of which would take its own 'Fetch-Decode-Execute-Store' cycle.

Two main reasons:

1. To enable more instructions to be executed at once by designing the processor to run more advanced instructions in its core.
2. In the past, memory and transistors were limited, so it was preferred to write shorter programs by combining multiple instructions into one.

To enable the processors to execute complex instructions, the processor's design becomes more complicated, as it is designed to execute a vast amount of different complex instructions, each of which has its own unit to execute it.

Furthermore, even though it takes a single instruction cycle to execute a single instruction, as the instructions are more complex, each instruction cycle takes more clock cycles. This fact leads to more power consumption and heat to execute each instruction.

### RISC

... favors splittin instructions into minor instructions, and so the CPU is designed only to handle simple instructions. This is done to relay the optimization to the software by writing the most optimized Assembly code.

The same previous ```add r1, r2, r3``` instruction on a RISC processor would fetch ```r2```, then fetch ```r3```, add them, and finally store them in ```r1```. Every instruction of these takes an entire 'Fetch-Decode-Execute-Store' instruction cycle, which leads to a larger number of total instructions per program, and hence a longer Assembly code.

By not supporting various types of complex instructions, RISC processors only support a limited number of instructions (~200) compared to CISC processors (~1500). So, to execute complex instructions, this has to be done through a combination of minor instructions through Assembly.

An advantage of splitting complex instructions into minor ones is having all instructions of the same length either 32-bit or 64-bit long. This enables designing the CPU clock speed around the instruction length so that executing each stage in the instruction cycle would always take precisely one machine clock cycle.

Executing each instruction stage in a single clock cycle and only executing simple instructions leads to RISC processors consuming a fraction of the power consumed by CISC processors, which makes these processors ideal for devices that run on batteries, like smartphones or laptops.

### CISC vs RISC

| Area | CISC | RISC |
| ---- | ---- | ---- |
| **Complexity** | favors complex instructions  | favors simple instructions |
| **Length of instructions** | longer instructions - variable length 'mulitple of 8 bits' | shorter instructions - fixed length '32-bit/64-bit' |
| **Total instructions per program** | fewer total instructions - shorter code | more total instructions - longer code |
| **Optimization** | relies on hardware optimization (_in CPU_) | relies on software optimization (_in Assembly_) |
| **Instruction Execution Time** | variable - mulitple of clock cycles | fixed - one clock cycle |
| **Instructions supported by CPU** | many instructiosn (~1500) | fewer instructions (~200) |
| **Power Consumption** | high | very low |
| **Examples** | Intel, AMD | ARM, Apple |

## Registers, Addresses, and Data Types

### Registers

Each CPU has a set of registers. The registers are the fastest components in any computer, as they are built within the CPU core. However, registers are very limited in size and can only hold a few bytes of data at a time.

There are two main types of registers:

| Data Registers | Pointer Registers |
| -------------- | ----------------- |
| ```rax``` | ```rbp``` |
| ```rbx``` | ```rsp``` |
| ```rcx``` | ```rip``` |
| ```rdx``` | |
| ```r8``` | |
| ```r9``` | |
| ```r10``` | |

- Data Registers
  - are usually used for storing instructions/syscall arguments
  - primary data registers are:
    - ```rax```
    - ```rbx```
    - ```rcx```
    - ```rdx```
    - ```rdi```, but usually for the instruction destination
    - ```rsi```, but usually for the instruction source
  - secondary registers, that can be used when all previous registers are in use:
    - ```r8```
    - ```r9```
    - ```r10```
- Pointer Registers
  - used to store specific important address pointers
  - main pointer registers:
    - Base Stack Pointer ```rbp```, which points to the beginning of the Stack
    - Current Stack Pointer ```rsp```, which points to the current location within the Stack
    - Instruction Pointer ```rip```, which holds the address of the next instruction

### Sub-Registers

Each 64-bit register can be further divided into smaller sub-registers containing the lower bits, at ony byte 8-bits, 2 bytes 16 bits, and 4 bytes 32 bits. Each sub-register can be used and accessed on its own, so you don't have to consume the full 64-bits if you have a smaller amount of data.

![assembly 7](../../images/assembly_7.png)

Sub-registers can be accessed as:

| Size in bits | Size in bytes | Name | Example |
| ------------ | ------------- | ---- | ------- |
| 16-bit | 2 byte | the base name | ```ax``` |
| 8-bit | 1 byte | base name and/or ends with 'l' | ```ax``` |
| 32-bit | 4 byte | base name + starts with the 'e' prefix | ```eax``` |
| 64-bit | 8 byte | base name + starts with the 'r' prefix | ```rax``` |

Take a look: [All Sub-Registers for all the essential registers in an x86_64 architecture](./assembly_x86_64_sub_registers.md)

### Memory Addresses

x86 64-bit processors have 64-bit wide addresses that range from ```0x0``` to ```0xffffffffffffffff```, so you expect the addresses to be in this range. However, RAM is segmented into various regions, like the Stack, the heap, and other program and kernel-specific regions. Each memory region has specific read, write, execute permissions that specify whether you can read from it, write to it, or call an address in it.

Whenever an instruction goes through the Instruction Cycle to be executed, the first step is to fetch the instruction from the address it's located at. There are several types of address fetching in the x86 architecture.

| Addressing Mode | Description | Example |
| --------------- | ----------- | ------- |
| **Immediate** | the value is given within the instruction | ```add 2``` |
| **Register** | the register name that holds the value is given in the instruction | ```add rax``` |
| **Direct** | the direct full address is given in the instruction | ```call 0xffffffffaa8a25ff``` |
| **Indirect** | a reference pointer is given in the instruction | ```call 0x44d000``` or ```call [rax]``` |
| **Stack** | address is on top of the stack | ```add rsp``` |

> [!NOTE]
> The less immediate the value is, the slower it is to fetch!

### Address Endianness

... is the order of its bytes in which they are stored or retrieved from memory. There are two types of endianness: **Little-Endian** and **Big-Endian**. With Little-Endian processors, the little-end byte of the address is filled/retrieved first right-to-left, while with Big-Endian processors, the big-end byte is filled/retrieved first left-to-right.

If you have the address ```0x0011223344556677``` to be stored in memory, little-endian processors would store the ```0x00``` byte on the right-most bytes, and then the ```0x11``` byte would be filled after it, so it becomes ```0x1100```, and then the ```0x22``` byte, so it becomes ```0x221100```, and so on. Once all bytes are in place, they would look like ```0x7766554433221100```, which is the reverse of the original value. Of course, when retrieving the value back, the processor will also use little-endian retrieval, so the value retrieved would be the same as the original value.

Another example that shows how this can affect the stored values in binary. If you had the 2-byte integer ```426```, its binary representation is ```00000001 10101010```. The order in which these two bytes are stored would change its value. If you stored it in reverse as ```10101010 00000001```, its value becomes ```43521```.

The big-endian processors would store these bytes as ```00000001 10101010``` left-to-right, while little-endian processors store them as ```10101010 00000001``` right-to-left. When retrieving the value, the processor has to use the same endianness used when storing them, or it will get the wrong value. This indicates that the order in which the bytes are stored/retrieved makes a big difference.

![assembly 8](../../images/assembly_8.png)

> [!NOTE]
> Little-endian byte order is used with Intel/AMD x86 in most modern OS, so the shellcode is always represented right-to-left.

### Data Types

The x86 architecture supports many types of data sizes, which can be used with various instructions. The following are the most common data types:

| Component | Length | Example |
| --------- | ------ | ------- |
| byte | 8 bits | ```0xab``` |
| word | 16 bits - 2 bytes | ```0xabcd``` |
| double word (dword) | 32 bits - 4 bytes | ```0xabcdef12``` |
| quad word (qword) | 64 bits - 8 bytes | ```0xabcdef1234567890``` |

> [!IMPORTANT]
> Whenever you use a variable with a certain data type or use a data type with an instruction, both operands should be of the same size.

For example, you can't use a variable defined as byte with ```rax```, as ```rax``` has a size of 8 bytes. In this case, you would have to use ```al```, which has the same size of 1 byte.

| Sub-Register | Data Type |
| ------------ | --------- |
| ```al``` | byte |
| ```ax``` | word |
| ```eax``` | dword |
| ```rax``` | qword |