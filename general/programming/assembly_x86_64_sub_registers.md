# Sub-Registers for all of the essential registers in x86_64

## Data/Argument Registers

| Description | 64-bit Register | 32-bit Register | 16-bit Register | 8-bit Register |
| ----------- | --------------- | --------------- | --------------- | -------------- |
| Syscall Number/Return value | ```rax``` | ```eax``` | ```ax``` | ```al``` |
| Callee Saved | ```rbx``` | ```ebx``` | ```bx``` | ```bl``` |
| 1st arg - Destination operand | ```rdi``` | ```edi``` | ```di``` | ```dil``` |
| 2nd arg - Source operand | ```rsi``` | ```esi``` | ```si``` | ```sil```  |
| 3rd arg | ```rdx``` | ```edx``` | ```dx``` | ```dl``` |
| 4th arg - Loop counter | ```rcx``` | ```ecx``` | ```cx``` | ```cl``` |
| 5th arg | ```r8``` | ```r8d``` | ```r8w``` | ```r8b``` |
| 6th arg | ```r9``` | ```r9d``` | ```r9w``` | ```r9b``` |


## Pointer Registers

| Description | 64-bit Register | 32-bit Register | 16-bit Register | 8-bit Register |
| ----------- | --------------- | --------------- | --------------- | -------------- |
| Base Stack Pointer | ```rbp``` | ```ebp``` | ```bp``` | ```bpl``` |
| Current/Top Stack Pointer | ```rsp``` | ```esp``` | ```sp``` | ```spl``` |
| Instruction Pointer 'call only' | ```rip``` | ```eip``` | ```ip``` | ```ipl``` |