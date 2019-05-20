var documenterSearchIndex = {"docs":
[{"location":"#ZarrNative.jl-1","page":"Home","title":"ZarrNative.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Reading and Writing Zarr Datasets from Julia","category":"page"},{"location":"#Package-features-1","page":"Home","title":"Package features","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This is a currently incomplete implementation of the Zarr specs v2. It is possible to read an write (compressed) chunked n-dimensional arrays to disk, memory and cloud storage backends. Have a look at the Tutorial for a quick start.","category":"page"},{"location":"#Manual-Outline-1","page":"Home","title":"Manual Outline","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Pages = [\n    \"tutorial.md\",\n    \"storage.md\",\n    \"reference.md\",\n]\nDepth = 2","category":"page"},{"location":"#Index-1","page":"Home","title":"Index","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"CurrentModule = ZarrNative\nDocTestSetup  = quote\n    using ZarrNative\nend","category":"page"},{"location":"tutorial/#Tutorial-1","page":"Tutorial","title":"Tutorial","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Zarr provides classes and functions for working with N-dimensional arrays that behave like Julia arrays but whose data is divided into chunks and each chunk is compressed. If you are already familiar with HDF5 then Zarr arrays provide similar functionality, but with some additional flexibility. This tutorial is an attempt to recreate this  Python Zarr tutorial as closely as possible and some of the explanation text is just copied and modified from this source.","category":"page"},{"location":"tutorial/#Creating-an-in-memory-array-1","page":"Tutorial","title":"Creating an in-memory array","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"ZarrNative has several functions for creating arrays. For example:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> using ZarrNative\n\njulia> z = zzeros(Int32,10000,10000,chunks=(1000,1000))\nZArray{Int32} of size 10000 x 10000","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"The code above creates a 2-dimensional array of 32-bit integers with 10000 rows and 10000 columns, divided into chunks where each chunk has 1000 rows and 1000 columns (and so there will be 100 chunks in total).","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Other Array creation routines are [zcreate, zones and zfill].","category":"page"},{"location":"tutorial/#Reading-and-Writing-data-1","page":"Tutorial","title":"Reading and Writing data","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Zarr arrays support a similar interface to Julia arrays for reading and writing data, although they don't implement the all indexing methods of an AbstractArray yet. For example, the entire array can be filled with a scalar value:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> z[:] = 42\n42","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Regions of the array can also be written to, e.g.:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> z[1,:]=1:10000;\n\njulia> z[:,1]=1:10000;","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"The contents of the array can be retrieved by slicing, which will load the requested region into memory as a Julia array, e.g.:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> z[1,1]\n1\n\njulia> z[end,end]\n42\n\njulia> z[1,:]\n10000-element Array{Int32,1}:\n     1\n     2\n     3\n     4\n     5\n     6\n     7\n     8\n     9\n    10\n     ⋮\n  9992\n  9993\n  9994\n  9995\n  9996\n  9997\n  9998\n  9999\n 10000\n\n\njulia> z[1:5,1:10]\n5×10 Array{Int32,2}:\n 1   2   3   4   5   6   7   8   9  10\n 2  42  42  42  42  42  42  42  42  42\n 3  42  42  42  42  42  42  42  42  42\n 4  42  42  42  42  42  42  42  42  42\n 5  42  42  42  42  42  42  42  42  42","category":"page"},{"location":"tutorial/#Persistent-arrays-1","page":"Tutorial","title":"Persistent arrays","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"In the examples above, compressed data for each chunk of the array was stored in main memory. Zarr arrays can also be stored on a file system, enabling persistence of data between sessions. For example:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> using ZarrNative\n\njulia> p = \"data/example.zarr\"\n\"data/example.zarr\"\n\njulia> z1 = zcreate(Int, 10000,10000,path = p,chunks=(1000, 1000))\nZArray{Int64} of size 10000 x 10000","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"The array above will store its configuration metadata and all compressed chunk data in a directory called ‘data/example.zarr’ relative to the current working directory. The zarr.create() function provides a way to create a new persistent array. Note that there is no need to close an array: data are automatically flushed to disk, and files are automatically closed whenever an array is modified.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Persistent arrays support the same interface for reading and writing data, e.g.:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> z1[:] = 42\n42\n\njulia> z1[1,:]=1:10000;\n\njulia> z1[:,1]=1:10000;\n","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Check that the data have been written and can be read again:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> z2 = zopen(p)\nZArray{Int64} of size 10000 x 10000\n\njulia> all(z1[:,:].==z2[:,:])\ntrue","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"A Julia-equivalent for zarr.load and zarr.save is still missing...","category":"page"},{"location":"tutorial/#Resizing-and-appending-1","page":"Tutorial","title":"Resizing and appending","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"TODO","category":"page"},{"location":"tutorial/#Compressors-1","page":"Tutorial","title":"Compressors","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"A number of different compressors can be used with Zarr. In this Julia package we currently support only Blosc compression, but more compression methods will be supported in the future. Different compressors can be provided via the compressor keyword argument accepted by all array creation functions. For example:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> using ZarrNative\n\njulia> compressor = ZarrNative.BloscCompressor(cname=\"zstd\", clevel=3, shuffle=true)\nZarrNative.BloscCompressor(0, 3, \"zstd\", true)\n\njulia> data = Int32(1):Int32(1000000000)\n1:1000000000\n\njulia> z = ZarrNative.zcreate(Int32,10000, 10000, chunks = (1000,1000),compressor=compressor)\nZArray{Int32} of size 10000 x 10000\n\njulia> z[:,:]=data\n1:1000000000","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"This array above will use Blosc as the primary compressor, using the Zstandard algorithm (compression level 3) internally within Blosc, and with the bit-shuffle filter applied.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"When using a compressor, it can be useful to get some diagnostics on the compression ratio. ZArrays provide a zinfo function which can be used to print some diagnostics, e.g.:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> zinfo(z)\nType                : ZArray\nData type           : Int32\nShape               : (10000, 10000)\nChunk Shape         : (1000, 1000)\nOrder               : C\nRead-Only           : false\nCompressor          : ZarrNative.BloscCompressor(0, 3, \"zstd\", true)\nStore type          : Dictionary Storage\nNo. bytes           : 400000000\nNo. bytes stored    : 2406369\nStorage ratio       : 166.2255456249644\nChunks initialized  : 100/100","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"If you don’t specify a compressor, by default Zarr uses the Blosc compressor. Blosc is generally very fast and can be configured in a variety of ways to improve the compression ratio for different types of data. Blosc is in fact a “meta-compressor”, which means that it can use a number of different compression algorithms internally to compress the data. Blosc also provides highly optimized implementations of byte- and bit-shuffle filters, which can improve compression ratios for some data.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"To disable compression, set compressor=ZarrNative.NoCompressor() when creating an array, e.g.:","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> z = zzeros(Int32,100000000, chunks=(1000000,), compressor=ZarrNative.NoCompressor());\n\njulia> storageratio(z)\n1.0","category":"page"},{"location":"reference/#Array-creation-1","page":"Function Reference","title":"Array creation","text":"","category":"section"},{"location":"reference/#","page":"Function Reference","title":"Function Reference","text":"zcreate\nzzeros","category":"page"},{"location":"reference/#ZarrNative.zcreate","page":"Function Reference","title":"ZarrNative.zcreate","text":"zcreate(T, dims...;kwargs)\n\nCreates a new empty zarr aray with element type T and array dimensions dims. The following keyword arguments are accepted:\n\npath=\"\" directory name to store a persistent array. If left empty, an in-memory array will be created\nname=\"\" name of the zarr array, defaults to the directory name\nstoragetype determines the storage to use, current options are DirectoryStore or DictStore\nchunks=dims size of the individual array chunks, must be a tuple of length length(dims)\nfill_value=nothing value to represent missing values\ncompressor=BloscCompressor() compressor type and properties\nattrs=Dict() a dict containing key-value pairs with metadata attributes associated to the array\nwriteable=true determines if the array is opened in read-only or write mode\n\n\n\n\n\nCreate a new subarray of the group g\n\n\n\n\n\n","category":"function"},{"location":"reference/#ZarrNative.zzeros","page":"Function Reference","title":"ZarrNative.zzeros","text":"zzeros(T, dims..., )\n\nCreates a zarr array and initializes all values with zero.\n\n\n\n\n\n","category":"function"},{"location":"reference/#Compressors-1","page":"Function Reference","title":"Compressors","text":"","category":"section"},{"location":"reference/#","page":"Function Reference","title":"Function Reference","text":"ZarrNative.BloscCompressor\nZarrNative.NoCompressor","category":"page"},{"location":"reference/#ZarrNative.BloscCompressor","page":"Function Reference","title":"ZarrNative.BloscCompressor","text":"BloscCompressor(;blocksize=0, clevel=5, cname=\"lz4\", shuffle=true)\n\nReturns a BloscCompressor struct that can serve as a Zarr array compressor. Keyword arguments are:\n\nclevel=5 the compression level, number between 0 (no compression) and 9 (max compression)\ncname=\"lz4\" compressor name, can be one of \"blosclz\", \"lz4\", and \"lz4hc\"\nshuffle=true enables/disables bit-shuffling\n\n\n\n\n\n","category":"type"},{"location":"reference/#ZarrNative.NoCompressor","page":"Function Reference","title":"ZarrNative.NoCompressor","text":"NoCompressor()\n\nCreates an object that can be passed to ZArray constructors without compression.\n\n\n\n\n\n","category":"type"},{"location":"storage/#Developing-new-storage-backends-1","page":"Storage Backends","title":"Developing new storage backends","text":"","category":"section"},{"location":"storage/#","page":"Storage Backends","title":"Storage Backends","text":"One advantage of the zarr data model is that it can be used in combiantion with a variety of storage backends. Currently in this package there is support for a DictStore (keeping data in memory), DirectoryStore (writing data to a local disk) and an S3Store for S3-compatible object store which is currently read-only. In oder to implement a new storage backend, you would have to create a subtype of ZarrNative.AbstractStore and implement the following methods:","category":"page"},{"location":"storage/#","page":"Storage Backends","title":"Storage Backends","text":"CurrentModule = ZarrNative","category":"page"},{"location":"storage/#","page":"Storage Backends","title":"Storage Backends","text":"storagesize\nzname\nBase.getindex(d::AbstractStore,i::String)\nBase.setindex!(d::AbstractStore,v,i::String)\nsubdirs\nBase.keys(d::AbstractStore)\nnewsub\ngetsub","category":"page"},{"location":"storage/#ZarrNative.storagesize","page":"Storage Backends","title":"ZarrNative.storagesize","text":"storagesize(d::AbstractStore)\n\nThis function shall return the size of all data files in a store.\n\n\n\n\n\n","category":"function"},{"location":"storage/#ZarrNative.zname","page":"Storage Backends","title":"ZarrNative.zname","text":"zname(d::AbstractStore)\n\nReturns the name of the current variable.\n\n\n\n\n\n","category":"function"},{"location":"storage/#Base.getindex-Tuple{ZarrNative.AbstractStore,String}","page":"Storage Backends","title":"Base.getindex","text":"Base.getindex(d::AbstractStore,i::String)\n\nReturns the data stored in the given key as a Vector{UInt8}\n\n\n\n\n\n","category":"method"},{"location":"storage/#Base.setindex!-Tuple{ZarrNative.AbstractStore,Any,String}","page":"Storage Backends","title":"Base.setindex!","text":"Base.setindex!(d::AbstractStore,v,i::String)\n\nWrites the values in v to the given store and key.\n\n\n\n\n\n","category":"method"},{"location":"storage/#ZarrNative.subdirs","page":"Storage Backends","title":"ZarrNative.subdirs","text":"subdirs(d::AbstractStore)\n\nReturns a list of keys for children stores in the given store.\n\n\n\n\n\n","category":"function"},{"location":"storage/#Base.keys-Tuple{ZarrNative.AbstractStore}","page":"Storage Backends","title":"Base.keys","text":"Base.keys(d::AbstractStore)\n\nReturns the keys of files in the given store.\n\n\n\n\n\n","category":"method"},{"location":"storage/#ZarrNative.newsub","page":"Storage Backends","title":"ZarrNative.newsub","text":"newsub(d::AbstractStore, name::String)\n\nCreate a new Store as a child of the given store d with given name. Returns the new created substore.\n\n\n\n\n\n","category":"function"},{"location":"storage/#ZarrNative.getsub","page":"Storage Backends","title":"ZarrNative.getsub","text":"getsub(d::AbstractStore, name::String)\n\nReturns the child store of name name.\n\n\n\n\n\n","category":"function"},{"location":"storage/#","page":"Storage Backends","title":"Storage Backends","text":"You can get some inspiration on how to implement this by looking at the source code of existing storage backends.","category":"page"}]
}
