using MemoryPack;

namespace Playground
{
    [MemoryPackable]
    public partial class Any
    {
        [MemoryPackOrder(0)]
        public int IntValue { get; set; } = 0;
        [MemoryPackOrder(1)]
        public float FloatValue { get; set; } = 0f;
        [MemoryPackOrder(2)]
        public string? StringValue { get; set; } = null;
    }

    class Program
    {
        static void Main(string[] args)
        {
            var anyObj = new Any{
                IntValue = 123,
                FloatValue = 123.456f,
                StringValue = "123",
            };

            byte[] bytes = MemoryPackSerializer.Serialize(anyObj);

            Any? decAnyObj = MemoryPackSerializer.Deserialize<Any>(bytes);

            if (decAnyObj != null) {
                Console.WriteLine(decAnyObj.FloatValue);
            }
        }
    }
}
