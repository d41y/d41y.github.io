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